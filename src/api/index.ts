import { fromFetch } from 'rxjs/fetch';
import { defer, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, delay, expand } from 'rxjs/operators';
import { SearchIdResponse, TicketsResponse } from '../types';
import ticketsResponse from '../assets/data/tickets.json';


const DEBUG = process.env.REACT_APP_DEBUG === 'true' && process.env.NODE_ENV !== 'production';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const MAX_RETRIES_STATUS = 1337;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function createRequest(url: string) {
  return fromFetch(url, {
    selector: response => {
      if (!response.ok) {
        return throwError(new ApiError(response.status, 'Response not ok'));
      }
      return response.json();
    },
  });
}

export function fetchSearchId(): Observable<SearchIdResponse> {
  if (DEBUG) {
    return of({ searchId: 'vi23Ef' }).pipe(
      delay(500),
    );
  }
  return createRequest(`${BASE_URL}/search`);
}

export function fetchTickets(searchId: string): Observable<TicketsResponse> {
  if (DEBUG) {
    return of(ticketsResponse as TicketsResponse).pipe(
      delay(500),
    );
  }
  return createRequest(`${BASE_URL}/tickets?searchId=${searchId}`);
}

export function fetchTicketsWithRetries(searchId: string, retriesLimit: number = 4) {
  let totalRetries = 0;
  return defer(() => fetchTickets(searchId)).pipe(
    catchError((error: ApiError, caught) => {
      if (totalRetries++ === retriesLimit) {
        return throwError(new ApiError(MAX_RETRIES_STATUS, 'Retries limit exceeded'));
      }
      if (error.status !== 500) {
        return throwError(error);
      }
      return caught;
    }),
  );
}

export function fetchTicketsUntilStop(searchId: string) {
  const request$ = defer(() => fetchTicketsWithRetries(searchId));

  return request$.pipe(
    expand(response => {
      if (response.stop) return EMPTY;
      return request$;
    }),
  );
}
