import { SearchId, SearchIdResponse, TicketsResponse } from '../types';
import { ticketsResponse } from '../assets/data';


const DEBUG = false;

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

class Api {
  constructor(private baseUrl: string) {
  }

  async getSearchId(): Promise<SearchIdResponse> {
    await delay(500);
    if (DEBUG) {
      return {
        searchId: '123',
      };
    }
    const response = await fetch(`${this.baseUrl}/search`);
    return response.json();

  }

  async getTickets(searchId: SearchId): Promise<TicketsResponse> {
    if (DEBUG) {
      await delay(200);
      return ticketsResponse;
    }
    const response = await fetch(`${this.baseUrl}/tickets?searchId=${searchId}`);
    if (response.status === 200) {
      return response.json();
    }
    throw new ApiError(response.status, 'oops');
  }
}

export default new Api('https://front-test.beta.aviasales.ru');
