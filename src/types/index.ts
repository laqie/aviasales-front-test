/* eslint-disable */


export enum Filter {
  None = 0,
  NoStops = 1 << 0,
  OneStop = 1 << 1,
  TwoStops = 1 << 2,
  ThreeStops = 1 << 3,
  All = NoStops | OneStop | TwoStops | ThreeStops
}

export type OrderByTime = 'time';
export type OrderByPrice = 'price';
export type Ordering = OrderByTime | OrderByPrice;


export type SearchId = string;

export interface SearchIdResponse {
  searchId: SearchId;
}

export interface Segment {
  // Код города (iata)
  origin: string;
  // Код города (iata)
  destination: string;
  // Дата и время вылета туда
  date: string;
  // Массив кодов (iata) городов с пересадками
  stops: string[];
  // Общее время перелёта в минутах
  duration: number;
}

export interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [Segment, Segment]; // eslint-disable-line
}

export interface TicketsResponse {
  tickets: Ticket[];
  stop: boolean;
}

export interface StopFilter {
  stops: number;
  active: boolean;
}
