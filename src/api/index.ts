import { SearchId, SearchIdResponse, TicketsResponse } from '../types';
import { delay } from '../utils';


const DEBUG = process.env.REACT_APP_DEBUG === 'true';

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
        searchId: 'vi23Ef',
      };
    }
    const response = await fetch(`${this.baseUrl}/search`);
    return response.json();
  }

  async getTickets(searchId: SearchId): Promise<TicketsResponse> {
    if (DEBUG) {
      await delay(200);
      const ticketsResponse: unknown = await import('../assets/data/tickets.json');
      return ticketsResponse as TicketsResponse;
    }

    const response = await fetch(`${this.baseUrl}/tickets?searchId=${searchId}`);
    if (response.status === 200) {
      return response.json();
    }
    throw new ApiError(response.status, 'oops');
  }
}

export default new Api(process.env.REACT_APP_API_BASE_URL);
