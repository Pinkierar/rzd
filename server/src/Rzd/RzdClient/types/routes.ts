import type {ParsedQs, Satisfies} from 'core';
import type {Station} from './stations';

export type RzdRoute = {
  route: {
    OriginStationCode: '2060600',
    DestinationStationCode: '2010180',
    Trains: [ [Object] ],
    ClientFeeCalculation: null,
    AgentFeeCalculation: null,
    OriginCode: '2060600',
    OriginStationInfo: {
      StationName: 'Киров Пасс',
      StationCode: '2060600',
      CnsiCode: '5831',
      RegionName: 'Кировская область',
      IsoCode: 'RU-KIR'
    },
    OriginTimeZoneDifference: 0,
    DestinationCode: '2010180',
    DestinationStationInfo: {
      StationName: 'Лабытнанги',
      StationCode: '2010180',
      CnsiCode: '6212',
      RegionName: 'Ямало-Ненецкий автономный округ',
      IsoCode: 'RU-YAN'
    },
    DestinationTimeZoneDifference: 2,
    RoutePolicy: 'Internal',
    DepartureTimeDescription: 'Moscow',
    ArrivalTimeDescription: 'Moscow',
    IsFromUkrain: false,
    NotAllTrainsReturned: false,
    BookingSystem: 'Express3',
    Id: 0,
    DestinationStationName: 'Лабытнанги',
    OriginStationName: 'Киров Пасс',
    MoscowDateTime: '2024-07-17T13:40:34.744'
  }
}

export type GetRoutesProps = {
  /**
   * Тип транспорта (поезд, электричка или любой)
   * @default 'any'
   */
  transport?: 'any' | 'trains' | 'electric',
  /**
   * Искать полностью занятые поезда
   * @default false
   */
  withoutSeats?: boolean,
  /**
   * Код станции, откуда едем
   */
  from: Station['code'],
  /**
   * Код станции, куда едем
   */
  to: Station['code'],
  /**
   * Когда едем
   */
  date: Date,
  /**
   * Искать маршрут без пересадок
   * @default false
   */
  withoutTransfers?: boolean,
}

export type GetRoutesQuery = Satisfies<{
  service_provider: 'B2B_RZD',
}, ParsedQs>

export type GetRoutesBody = {
  Origin: string,
  Destination: string,
  DepartureDate: string,
  TimeFrom: '0',
  TimeTo: '24',
  CarGrouping: 'DontGroup',
  GetByLocalTime: 'true',
  SpecialPlacesDemand: 'StandardPlacesAndForDisabledPersons',
  CarIssuingType: 'All',
  GetTrainsFromSchedule: 'true',
}