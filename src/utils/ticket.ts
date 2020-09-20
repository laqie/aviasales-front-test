import { StopFilter, Ticket } from '../types';


export const getIATALogoUrl = (iata: string) => `//pics.avs.io/99/36/${iata}.png`;

const getTicketTime = (ticket: Ticket) => ticket
  .segments
  .map(s => s.duration)
  .reduce((a, b) => a + b);

const getTicketStops = (ticket: Ticket) => ticket
  .segments
  .map(s => s.stops.length)
  .reduce((a, b) => Math.max(a, b));

export const timeComparator = (t1: Ticket, t2: Ticket): number => {
  return getTicketTime(t1) - getTicketTime(t2);
};

export const priceComparator = (t1: Ticket, t2: Ticket): number => {
  return t1.price - t2.price;
};

export const ticketChecker = (filters: StopFilter[]) => (ticket: Ticket): boolean => {
  for (const { stops } of filters) {
    if (stops === getTicketStops(ticket)) {
      return true;
    }
  }
  return false;
};
