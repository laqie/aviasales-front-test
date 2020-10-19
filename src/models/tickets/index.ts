import { combineLatest } from 'rxjs';
import { debounceTime, map, shareReplay, startWith } from 'rxjs/operators';
import { ObservableEffect, ObservableStore } from '@carex/core';
import { LocalTicket, SearchId, SearchIdResponse, TicketsResponse } from '../../types';
import { ApiError } from '../../api';
import { activeFiltersStops$ } from '../filters';
import { ordering$ } from '../ordering';

import { durationComparator, priceComparator, ticketChecker } from '../../utils/ticket';


export const tickets$ = new ObservableStore<LocalTicket[]>([]);
export const searchId$ = new ObservableStore<SearchId>('');

export const fetchSearchIdFx$ = new ObservableEffect<void, SearchIdResponse>();
export const fetchTicketsFx$ = new ObservableEffect<SearchId, TicketsResponse, ApiError>();

export const visibleTickets$ = combineLatest(
  [tickets$, activeFiltersStops$, ordering$],
).pipe(
  debounceTime(0),
  map(([tickets, activeFilters, ordering]) => {
    const isValidTicket = ticketChecker(activeFilters);
    return tickets.filter(isValidTicket)
      .sort(ordering === 'time' ? durationComparator : priceComparator)
      .slice(0, 5);
  }),
  startWith([]),
  shareReplay(1),
);
