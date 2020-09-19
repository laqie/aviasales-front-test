import { combine, createEffect, createEvent, createStore, restore } from 'effector';
import { createGate } from 'effector-react';
import { ApiError } from '../../api';
import { Ordering, SearchId, SearchIdResponse, Ticket, TicketsResponse } from '../../types';


const getTicketTime = (ticket: Ticket) => ticket
  .segments
  .map(s => s.duration)
  .reduce((a, b) => a + b);

const getTicketStops = (ticket: Ticket) => ticket
  .segments
  .map(s => s.stops.length)
  .reduce((a, b) => Math.max(a, b));

const timeComparator = (t1: Ticket, t2: Ticket): number => {
  return getTicketTime(t1) - getTicketTime(t2);
};

const priceComparator = (t1: Ticket, t2: Ticket): number => {
  return t1.price - t2.price;
};


const ticketChecker = (filters: StopFilter[]) => (ticket: Ticket): boolean => {
  for (const { stops } of filters) {
    if (stops === getTicketStops(ticket)) {
      return true;
    }
  }
  return false;
};

export const TicketsGate = createGate();

export const $stopFilters = createStore<StopFilter[]>([]);
export const $allStopFiltersActive = $stopFilters.map(filters => filters.every(filter => filter.active));
export const toggleStopFilter = createEvent<number>();
export const setAllStopFilters = createEvent<boolean>();

export const updateStopFilters = createEffect<TicketsResponse, number[]>();

export const $tickets = createStore<Ticket[]>([]);

export const setOrdering = createEvent<Ordering>();
export const $ordering = restore(setOrdering, 'price');

export const $retries = createStore(0);

export const $searchId = createStore<SearchId>('');

export const $stop = createStore(false);

export const fetchSearchIdFx = createEffect<void, SearchIdResponse>();
export const fetchTicketsFx = createEffect<SearchId, TicketsResponse, ApiError>();

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

export interface StopFilter {
  stops: number;
  active: boolean;
}







