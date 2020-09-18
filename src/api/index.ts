import { SearchId, SearchIdResponse, TicketsResponse } from '../types';
import { ticketsResponse } from '../assets/data';


const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

class Api {
  constructor(private baseUrl: string) {
  }

  async search(): Promise<SearchIdResponse> {
    await delay(200);
    return {
      searchId: '123qwe',
    };
  }

  async tickets(searchId: SearchId): Promise<TicketsResponse> {
    await delay(200);
    return ticketsResponse;
  }
}

export default new Api('');
