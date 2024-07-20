import {ErrorInfo, Fail, type Json, type ParsedQs} from 'core';
import type {
  CarPricing,
  CarPricingProps,
  RzdNode,
  RzdNodeType,
  RzdObjectMap,
  TrainPricing,
  TrainPricingProps,
} from './types';
import {ExHttpClient} from '#includes/ExHttpClient';

type RzdError = {
  result: 'FAIL',
  type: string, // 'SYSTEM_ERROR',
  error: string, // 'Произошла системная ошибка.',
  timestamp: string, // '17.07.2024 03:21:13.337'
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/124.0.0.0 ' +
  'YaBrowser/24.6.0.0 ' +
  'Safari/537.36';

class RzdClient extends ExHttpClient {
  protected isFake: boolean = false;

  public constructor() {
    super({
      baseURL: 'https://ticket.rzd.ru',
      timeout: 5000,
      withCredentials: true,
      headers: {
        // 'Accept': 'application/json',
        'Referer': 'https://www.rzd.ru/',
        'User-Agent': USER_AGENT,
      },
      logging: false,
    });
  }

  // public async getRoutes(props: GetRoutesProps) {
  //   const {
  //     from,
  //     to,
  //     date,
  //   } = props;
  //
  //   const formedDate = new Date(
  //     date.valueOf() - date.getTimezoneOffset() * 60000,
  //   ).toISOString().split('.')[0];
  //
  //   const url = 'apib2b/p/Railway/V1/Search/TrainPricing';
  //
  //   const query: GetRoutesQuery = {
  //     service_provider: 'B2B_RZD',
  //   };
  //
  //   const body: GetRoutesBody = {
  //     Origin: from,
  //     Destination: to,
  //     DepartureDate: formedDate,
  //     TimeFrom: '0',
  //     TimeTo: '24',
  //     CarGrouping: 'DontGroup',
  //     GetByLocalTime: 'true',
  //     SpecialPlacesDemand: 'StandardPlacesAndForDisabledPersons',
  //     CarIssuingType: 'All',
  //     GetTrainsFromSchedule: 'true',
  //   };
  //
  //   return await this.post<RzdRoute, GetRoutesBody, GetRoutesQuery>(url, body, query);
  // }

  // public async searchStations(props: SearchStationsProps): Promise<Station[]> {
  //   const {
  //     namePart,
  //   } = props;
  //
  //   const url = 'api/v1/suggests';
  //
  //   const query: SearchStationsQuery = {
  //     GroupResults: 'true',
  //     RailwaySortPriority: 'true',
  //     MergeSuburban: 'true',
  //     Query: namePart,
  //     Language: 'ru',
  //     TransportType: 'rail',
  //   };
  //
  //   const response = await this.get<SearchStationsResult, void, SearchStationsQuery>(url, undefined, query);
  //
  //   return response.train.map(({name, expressCode: code, region}) => ({name, code, region}));
  // }

  // public async setJSessionIdInCookies(props: {
  //   from: RzdNode<'station'>['nodeId'],
  //   to: RzdNode<'station'>['nodeId'],
  //   date: string,
  // }): Promise<void> {
  //   const {
  //     from,
  //     to,
  //     date,
  //   } = props;
  //
  //   const url = 'api/v1/combined-routes/check';
  //
  //   const query = {
  //     origin: from,
  //     destination: to,
  //     date: date,
  //   } as const satisfies ParsedQs;
  //
  //   await this.get(url, undefined, query);
  // }

  public async getObjectByNodeId<Type extends RzdNodeType>(props: RzdNode<Type>): Promise<RzdObjectMap[Type]> {
    const {
      nodeId,
    } = props;

    const url = 'api/v1/getobject';

    const query = {
      id: nodeId,
    } as const satisfies ParsedQs;

    return await this.get<RzdObjectMap[Type], Json, ParsedQs>(url, undefined, query);
  }

  public async getTrainPricing(props: TrainPricingProps): Promise<TrainPricing> {
    const {
      from,
      to,
      date,
    } = props;

    const url = 'apib2b/p/Railway/V1/Search/TrainPricing';

    const query = {
      service_provider: 'B2B_RZD',
    } as const satisfies ParsedQs;

    const body = {
      Origin: from,
      Destination: to,
      DepartureDate: `${date}T00:00:00`,
      TimeFrom: 0,
      TimeTo: 24,
      CarGrouping: 'DontGroup',
      GetByLocalTime: true,
      SpecialPlacesDemand: 'StandardPlacesAndForDisabledPersons',
      CarIssuingType: 'All',
      GetTrainsFromSchedule: true,
    } as const satisfies Json;

    return await this.post<TrainPricing, Json, ParsedQs>(url, body, query);
  }

  public async getCarPricing(props: CarPricingProps): Promise<CarPricing> {
    const {
      OriginStationCode,
      DestinationStationCode,
      DepartureDateTime,
      Provider,
      TrainNumber,
    } = props;

    const url = 'apib2b/p/Railway/V1/Search/CarPricing';

    const query = {
      service_provider: 'B2B_RZD',
      isBonusPurchase: 'false',
    } as const satisfies ParsedQs;

    const body = {
      OriginCode: OriginStationCode,
      DestinationCode: DestinationStationCode,
      DepartureDate: DepartureDateTime,
      Provider: Provider,
      TrainNumber: TrainNumber,
      SpecialPlacesDemand: 'StandardPlacesAndForDisabledPersons',
      OnlyFpkBranded: false,
      CarIssuingType: 'All',
    } as const satisfies Json;

    return await this.post<CarPricing, Json, ParsedQs>(url, body, query);
  }

  protected errorHandler<ResBody>(response: Fail | ResBody | RzdError): ResBody {
    if (response instanceof Fail) throw Fail;

    if (typeof response !== 'object') return response;
    if (!response) return response;
    if (!('result' in response)) return response;
    // @ts-ignore
    if (response.result !== 'FAIL') return response;

    const {error, ...info} = response;
    throw new ErrorInfo('RzdClient.toValidRes', error, info);
  }
}

export const rzdClient = new RzdClient();