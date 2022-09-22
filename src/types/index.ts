export type OrderByTime = 'time';
export type OrderByPrice = 'price';
export type OrderingType = OrderByTime | OrderByPrice;


export type SearchIdType = string;

export interface ISearchIdResponse {
  searchId: SearchIdType;
}

export interface ISegment {
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

export interface ITicket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [ISegment, ISegment];
}

export interface ITicketsResponse {
  tickets: ITicket[];
  stop: boolean;
}

export interface IStopFilter {
  stops: number;
  active: boolean;
}

export interface LocalTicket extends ITicket {
  stops: number;
  totalDuration: number;
}
