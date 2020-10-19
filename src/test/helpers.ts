import { SearchIdResponse, TicketsResponse } from '../types';


export const searchIdResponse: SearchIdResponse = {
  searchId: '123qwe',
};

export const emptyTicketResponse: TicketsResponse = {
  stop: true,
  tickets: [],
};

export const ticketResponse: TicketsResponse = {
  tickets: [
    {
      'price': 1000,
      'carrier': 'S7',
      'segments': [
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-09-28T10:45:00.000Z',
          'stops': [
            'HKG',
            'JNB',
          ],
          'duration': 2000,
        },
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-10-18T11:20:00.000Z',
          'stops': [
            'HKG',
            'JNB',
          ],
          'duration': 2000,
        },
      ],
    },
    {
      'price': 2000,
      'carrier': 'SU',
      'segments': [
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-09-28T03:43:00.000Z',
          'stops': [
            'IST',
          ],
          'duration': 1000,
        },
        {
          'origin': 'HKT',
          'destination': 'MOW',
          'date': '2020-10-18T07:52:00.000Z',
          'stops': [],
          'duration': 1000,
        },
      ],
    },
  ],
  stop: true,
};

export function constVoid(): void {
  return;
}

export function identity<A>(a: A): A {
  return a;
}


export interface Params {
  marbles: string;
  values: { [key: string]: any },
  error?: any;
}
