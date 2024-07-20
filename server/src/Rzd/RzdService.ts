import {
  type Car,
  type GetRoutesProps,
  rzdClient,
  type RzdNode,
  type RzdStation,
  type SearchStationsProps,
  type Station, type Train,
} from './RzdClient';

export type TrainPath = {
  from: RzdNode<'station'>['nodeId'],
  to: RzdNode<'station'>['nodeId'],
  date: string,
  trainNumber: Train['TrainNumber'],
}

class RzdService {
  // public async getRoutes(
  //   from: GetRoutesProps['from'],
  //   to: GetRoutesProps['to'],
  //   date: GetRoutesProps['date'],
  //   props: Omit<GetRoutesProps, 'from' | 'to' | 'date'> = {},
  // ) {
  //   return await rzdClient.getRoutes({from, to, date, ...props});
  // }

  // public async searchStations(
  //   nameLike: SearchStationsProps['namePart'],
  //   props: Omit<SearchStationsProps, 'namePart'> = {},
  // ): Promise<Station[]> {
  //   return await rzdClient.searchStations({namePart: nameLike, ...props});
  // }

  // public async getStationById(id: RzdNode<'station'>['nodeId']): Promise<RzdStation> {
  //   return await rzdClient.getObjectByNodeId({
  //     nodeId: id,
  //     nodeType: 'station',
  //   });
  // }

  // private async getFreePlaces() {
  //
  //
  //   const cars: Car[] = ;
  //
  //   const carsFreePlaces = new Map<string, number[]>();
  //   for (const car of cars) {
  //     if (car.CarType === 'Baggage') continue;
  //
  //     const freePlaces = car.FreePlaces.split(', ').map(place => Number.parseInt(place));
  //
  //     const savedPlaces = carsFreePlaces.get(car.CarNumber);
  //     if (savedPlaces) {
  //       savedPlaces.push(...freePlaces);
  //     } else {
  //       carsFreePlaces.set(car.CarNumber, freePlaces);
  //     }
  //   }
  // }

  public async getCarPricing() {

  }
}

export const rzdService = new RzdService();