import type {Json, Satisfies} from 'core';

export type RzdNodeType = 'station';

export type RzdNode<Type extends RzdNodeType> = {
  nodeId: string,
  nodeType: Type,
}

export type RzdStation = RzdNode<'station'> & {
  expressCode: string,
  foreignCode: string,
  name: string,
  transportType: 'train',
  region: string,
  regionIso: string,
  countryIso: string,
  suburbanCode: string,
  hasAeroExpress: boolean,
}

export type RzdObjectMap = Satisfies<{
  station: RzdStation,
}, Record<RzdNodeType, Json>>;