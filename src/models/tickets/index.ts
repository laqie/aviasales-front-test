import { combine, createEffect, createEvent, createStore, restore } from 'effector';
import { createGate } from 'effector-react';
import { ApiError } from '../../api';
import { Filter, Ordering, SearchId, SearchIdResponse, Ticket, TicketsResponse } from '../../types';


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


const ticketChecker = (filterValue: Filter) => (ticket: Ticket): boolean => {
  if (filterValue === Filter.All) return true;
  if (filterValue === Filter.None) return false;
  const isActive = (filter: Filter) => Boolean(filterValue & filter);
  const stops = getTicketStops(ticket);
  if (isActive(Filter.NoStops) && stops === 0) return true;
  if (isActive(Filter.OneStop) && stops === 1) return true;
  if (isActive(Filter.TwoStops) && stops === 2) return true;
  if (isActive(Filter.ThreeStops) && stops === 3) return true;

  return false;
};

export const TicketsGate = createGate();

export const $tickets = createStore<Ticket[]>([]);

export const $filter = createStore<number>(Filter.All);
export const setFilter = createEvent<number>();
export const toggleFilter = createEvent<Filter>();

export const setOrdering = createEvent<Ordering>();
export const $ordering = restore(setOrdering, 'price');

export const $retries = createStore(0);

export const $searchId = createStore<SearchId>('');

export const $stop = createStore(false);

export const fetchSearchIdFx = createEffect<void, SearchIdResponse>();
export const fetchTicketsFx = createEffect<SearchId, TicketsResponse, ApiError>();

export const $visibleTickets = combine(
  $tickets,
  $filter,
  $ordering,
  (tickets, filter, ordering) => {
    return [...tickets.filter(ticketChecker(filter))]
      .sort(ordering === 'time' ? timeComparator : priceComparator)
      .slice(0, 5);
  });





