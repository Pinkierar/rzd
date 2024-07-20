import Core, {HttpError, HttpStatus, logger, server} from 'core';
import RoleModel from 'role-model';
import Tasks from 'tasks';
import {rzdClient} from './Rzd/RzdClient';
import {isValidDate} from '#includes/isValidDate';
import {isString} from '#includes/isString';

server.dbConfigure({
  chain: [
    Core.dbChain,
    RoleModel.dbChain,
    Tasks.dbChain,
  ],
  relations: [
    RoleModel.dbRelations,
    Tasks.dbRelations,
  ],
});

server.configure({
  error: {withInfo: true},
});

server.useControllers(Core.controllers);
server.useControllers(RoleModel.controllers);
server.useControllers(Tasks.controllers);

server.start(async () => {
  logger.logFullObject(server.getAllRoutes());

  try {
    const url = 'https://ticket.rzd.ru/searchresults/v/1/5a8ac77e340c74258ad36764/5a13bdbe340c745ca1e8a918/2024-09-15';
    const trainNumber = '100Г';

    const urlComponents = url.split('/');
    const [fromId, toId, date] = urlComponents.slice(-3) as (string | undefined)[];

    if (!isString(fromId, 24)) throw new HttpError(
      'root',
      HttpStatus.BadRequest,
      'Идентификатор станции отправления указан неверно',
      {fromId},
    );

    if (!isString(toId, 24)) throw new HttpError(
      'root',
      HttpStatus.BadRequest,
      'Идентификатор станции прибытия указан неверно',
      {toId},
    );

    if (!isValidDate(date)) throw new HttpError(
      'root',
      HttpStatus.BadRequest,
      'Дата отправления указана неверно',
      {date},
    );

    const {expressCode: from} = await rzdClient.getObjectByNodeId({nodeId: fromId, nodeType: 'station'});
    const {expressCode: to} = await rzdClient.getObjectByNodeId({nodeId: toId, nodeType: 'station'});

    const trainPricing = await rzdClient.getTrainPricing({from, to, date});

    const train = trainPricing.Trains.find(train => train.TrainNumber === trainNumber);
    if (!train) throw new HttpError(
      'root',
      HttpStatus.BadRequest,
      'Указанный номер поезда не существует в указанном маршруте в указанную дату',
      {trainNumber},
    );

    const carPricing = await rzdClient.getCarPricing(train);

    const carsFreePlacesMap = new Map<string, number[]>();
    for (const car of carPricing.Cars) {
      if (car.CarType === 'Baggage') continue;

      const freePlaces = car.FreePlaces.split(', ').map(place => Number.parseInt(place));

      const savedPlaces = carsFreePlacesMap.get(car.CarNumber);
      if (savedPlaces) {
        savedPlaces.push(...freePlaces);
      } else {
        carsFreePlacesMap.set(car.CarNumber, freePlaces);
      }
    }

    const carsFreePlaces = Array
      .from(carsFreePlacesMap.entries())
      .map(([carNumber, freePlaces]) => ({carNumber, freePlaces}));

    const carsFreeLowerPlaces = carsFreePlaces.map(({carNumber, freePlaces}) => ({
      carNumber,
      freePlaces: freePlaces.filter(place => place % 2 === 1),
    })).filter(({freePlaces}) => freePlaces.length > 0);

    logger.logFullObject({carsFreeLowerPlaces});
  } catch (e) {
    logger.log(e);
  }
});