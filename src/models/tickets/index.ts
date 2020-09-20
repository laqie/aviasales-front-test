import { combine, createEffect, createStore } from 'effector';
import { ApiError } from '../../api';
import { SearchId, SearchIdResponse, Ticket, TicketsResponse } from '../../types';
import { $stopFilters } from '../filters';
import { $ordering } from '../ordering';
import { priceComparator, ticketChecker, timeComparator } from '../../utils/ticket';

// Stores
export const $tickets = createStore<Ticket[]>([]);
export const $retries = createStore(0);
export const $searchId = createStore<SearchId>('');
export const $stop = createStore(false);
export const $visibleTickets = combine(
  $tickets,
  $stopFilters,
  $ordering,
  (tickets, filters, ordering) => {
    const activeFilters = filters.filter(filter => filter.active);
    return [...tickets.filter(ticketChecker(activeFilters))]
      .sort(ordering === 'time' ? timeComparator : priceComparator)
      .slice(0, 5);
  });

// Effects
export const fetchSearchIdFx = createEffect<void, SearchIdResponse>();
export const fetchTicketsFx = createEffect<SearchId, TicketsResponse, ApiError>();
