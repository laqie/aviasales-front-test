import { ITicket, LocalTicket } from '../types';


export const getIATALogoUrl = (iata: string) => `https://pics.avs.io/99/36/${iata}.png`;

const getTicketDuration = (ticket: ITicket) => ticket
  .segments
  .map(s => s.duration)
  .reduce((a, b) => a + b);

const getTicketStops = (ticket: ITicket) => ticket
  .segments
  .map(s => s.stops.length)
  .reduce((a, b) => Math.max(a, b));

export const durationComparator = (t1: LocalTicket, t2: LocalTicket): number => {
  return t1.totalDuration - t2.totalDuration;
};

export const priceComparator = (t1: ITicket, t2: ITicket): number => {
  return t1.price - t2.price;
};

export const ticketChecker = (filters: number[]) => (ticket: LocalTicket): boolean => {
  return filters.some(f => f === ticket.stops);
};

export const transformTicket = (ticket: ITicket): LocalTicket => {
  const stops = getTicketStops(ticket);
  const totalDuration = getTicketDuration(ticket);

  return {
    ...ticket,
    stops,
    totalDuration,
  };
};
