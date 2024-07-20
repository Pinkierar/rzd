import type {Train} from './TrainPricing';

type Direction =
  | 'PassengerBoardingControl'
  | 'NoValue'

export type CarType =
  | 'Compartment'
  | 'ReservedSeat'
  | 'Baggage'

type AvailableBaggageType = {
  Type:
    | 'HandLuggage'
    | 'OversizedLuggage'
    | 'LuggageInBaggageRoom'
    | 'PetTransportation',
  Name:
    | 'Ручная кладь'
    | 'Негабаритный багаж'
    | 'Багаж в специально оборудованных купе'
    | 'Домашние животные',
  Description: null,
  CarBaggageInfo: null,
}

type Discount = {
  DiscountType:
    | 'Birthday'
    | 'BirthdayAccompanying'
    | 'InternalFamily'
    | 'UniversalCard'
    | 'BusinessTravelCard'
    | 'Pupil',
  Description: string,
}

type FreePlacesByCompartment = {
  CompartmentNumber: string,
  Places: string,
}

type ServicesWithIndication = {
  CarService: string,
  Indication: string /* 'Included' | 'NotIncluded' */,
}

export type Car = {
  DestinationStationCode: string,
  CarType: CarType,
  CarDirection: Direction,
  RailwayCarSchemeId: number | null,
  HasImages: boolean,
  CarSubType: string,
  CarTypeName: string /* 'КУПЕ' | 'ПЛАЦ' | 'БАГАЖ' */,
  CarSchemeName: string,
  CarNumber: string,
  ServiceClass: string,
  ServiceClassNameRu: null,
  ServiceClassNameEn: null,
  InternationalServiceClass: string,
  CarDescription: string | null /* 'Ж' | '* И Ж' | 'МЖ' | null */,
  ServiceClassTranscript: string,
  FreePlaces: string,
  FreePlacesByCompartments: FreePlacesByCompartment[],
  PlaceQuantity: number,
  IsTwoStorey: boolean,
  Services: string[] /* ('Bedclothes' | 'AirConditioning' | 'BioToilet' | 'PetsCarriage')[] */,
  ServicesWithIndication: ServicesWithIndication[],
  PetTransportationShortDescription: null | string,
  PetTransportationFullDescription: null | string,
  MinPrice: number,
  MaxPrice: number,
  ServiceCost: number,
  PlaceReservationType: string /* 'Usual' */,
  Carrier: string,
  CarrierDisplayName: string,
  HasGenderCabins: boolean,
  RzhdCardTypes: string[] /* ('BusinessTravel' | 'UniversalRzhdCard' | 'RzhdBonus')[] */,
  TrainNumber: string,
  ArrivalDateTime: Date,
  LocalArrivalDateTime: Date,
  HasNoInterchange: boolean,
  HasPlaceNumeration: boolean,
  IsBeddingSelectionPossible: boolean,
  HasElectronicRegistration: boolean,
  HasDynamicPricing: boolean,
  HasPlacesNearBabies: boolean,
  HasPlacesNearPlayground: boolean,
  HasPlacesNearPets: boolean,
  HasNonRefundableTariff: boolean,
  OnlyNonRefundableTariff: boolean,
  IsAdditionalPassengerAllowed: boolean,
  IsChildTariffTypeAllowed: boolean,
  CarPlaceType: string,
  CarPlaceCode: string,
  CarPlaceNameRu: string,
  CarPlaceNameEn: string,
  Discounts: Discount[],
  AllowedTariffs: any[],
  IsSaleForbidden: boolean,
  AvailabilityIndication: string /* 'Available' */,
  IsThreeHoursReservationAvailable: boolean,
  Road: string /* 'ГОР' */,
  InfoRequestSchema: string /* 'StandardIncludingInvalids' */,
  PassengerSpecifyingRules: string /* 'Standard' */,
  IsMealOptionPossible: boolean,
  IsAdditionalMealOptionPossible: boolean,
  IsOnRequestMealOptionPossible: boolean,
  MealSalesOpenedTill: Date,
  IsTransitDocumentRequired: boolean,
  IsInterstate: boolean,
  ClientFeeCalculation: null,
  AgentFeeCalculation: null,
  IsBranded: boolean,
  IsBuffet: boolean,
  TripDirection: string /* 'Internal' */,
  IsFromUkrainianCalcCenter: boolean,
  IsForDisabledPersons: boolean,
  IsSpecialSaleMode: boolean,
  BoardingSystemType: Direction,
  AvailableBaggageTypes: AvailableBaggageType[],
  IsTourPackageAvailable: boolean,
  ArePlacesForBusinessTravelBooking: boolean,
  IsCarTransportationCoach: boolean,
  CarNumeration: 'FromHead' | 'Unknown',
  IsGroupTransportaionAvailable: boolean,
  CarPlaceName: string,
  HasFssBenefit: boolean,
  ServiceClassName: string,
}

type StationInfo = {
  StationName: string,
  StationCode: string,
  CnsiCode: string,
  RegionName: string,
  IsoCode: string,
}

type TrainInfo = {
  TrainNumber: string,
  TrainNumberToGetRoute: string,
  string: string,
  TrainDescription: string,
  TrainName: string,
  TrainNameEn: string,
  TransportType: string,
  OriginName: string,
  InitialStationName: string,
  OriginStationCode: string,
  OriginStationInfo: StationInfo,
  InitialTrainStationInfo: StationInfo,
  InitialTrainStationCode: string,
  InitialTrainStationCnsiCode: string,
  DestinationName: string,
  FinalStationName: string,
  DestinationStationCode: string,
  DestinationStationInfo: StationInfo,
  FinalTrainStationInfo: StationInfo,
  FinalTrainStationCode: string,
  FinalTrainStationCnsiCode: string,
  DestinationNames: string[],
  FinalStationNames: string[],
  DepartureDateTime: Date,
  LocalDepartureDateTime: Date,
  ArrivalDateTime: Date,
  LocalArrivalDateTime: Date,
  ArrivalDateTimes: Date[],
  LocalArrivalDateTimes: Date[],
  DepartureDateFromFormingStation: Date,
  DepartureStopTime: number,
  ArrivalStopTime: number,
  TripDuration: number,
  TripDistance: number,
  IsSuburban: boolean,
  IsComponent: boolean,
  CarServices: any[],
  IsSaleForbidden: boolean,
  IsTicketPrintRequiredForBoarding: boolean,
  BookingSystem: string,
  IsVrStorageSystem: boolean,
  PlacesStorageType: string,
  BoardingSystemTypes: Direction[],
  TrainBrandCode: string,
  TrainClassNames: null,
}

export type CarPricing = {
  OriginCode: string,
  DestinationCode: string,
  OriginTimeZoneDifference: number,
  DestinationTimeZoneDifference: number,
  Cars: Car[],
  RoutePolicy: string /* 'Internal' */,
  TrainInfo: TrainInfo,
  IsFromUkrain: boolean,
  AllowedDocumentTypes: string[],
  ClientFeeCalculation: null,
  AgentFeeCalculation: null,
  BookingSystem: string,
  CarTariffPrices: null,
}

export type CarPricingProps = Pick<Train,
  | 'DepartureDateTime'
  | 'OriginStationCode'
  | 'DestinationStationCode'
  | 'TrainNumber'
  | 'Provider'
>