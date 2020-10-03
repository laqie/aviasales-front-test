import { ObservableEffect, ObservableStore } from '@carex/core';
import { SearchId, SearchIdResponse, Ticket, TicketsResponse } from '../../types';
import { ApiError } from '../../api';
import { map } from 'rxjs/operators';
import { stopFilters$ } from '../filters';
import { ordering$ } from '../ordering';
import { combineLatest } from 'rxjs';
import { priceComparator, ticketChecker, timeComparator } from '../../utils/ticket';


export const tickets$ = new ObservableStore<Ticket[]>([]);
export const searchId$ = new ObservableStore<SearchId>('');

export const fetchSearchIdFx$ = new ObservableEffect<void, SearchIdResponse>();
export const fetchTicketsFx$ = new ObservableEffect<SearchId, TicketsResponse, ApiError>();

export const visibleTickets$ = combineLatest(
  [tickets$, stopFilters$, ordering$],
).pipe(
  map(([tickets, filters, ordering]) => {
    const activeFilters = filters.filter(filter => filter.active);
    return [...tickets.filter(ticketChecker(activeFilters))]
      .sort(ordering === 'time' ? timeComparator : priceComparator)
      .slice(0, 5);
  }),
);
