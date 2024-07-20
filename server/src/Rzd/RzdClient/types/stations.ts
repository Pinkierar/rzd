import type {ParsedQs, Satisfies} from 'core';

export type Station = {
  name: string,
  code: string,
  region: string,
}

export type SearchStationsProps = {
  namePart: string,
  compactMode?: boolean,
}

export type SearchStationsQuery = Satisfies<{
  GroupResults: 'true',
  RailwaySortPriority: 'true',
  MergeSuburban: 'true',
  Query: string,
  Language: 'ru',
  TransportType: 'rail',
}, ParsedQs>

export type SearchStationsResult = {
  train: {
    expressCode: string,
    name: string,
    region: string,
  }[],
}