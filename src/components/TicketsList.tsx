import React from 'react';
import { useStore } from '@carex/react';

import { visibleTickets$ } from '../models/tickets';
import { Info, StyledTickets } from './TicketsList.sc';
import TicketSkeleton from './TicketSkeleton';
import Ticket from './Ticket';
import { appReady$ } from '../models/app';
import { distinctUntilChanged, map } from 'rxjs/operators';


function TicketsList() {
  const appReady = useStore(appReady$);
  const tickets = useStore(visibleTickets$);
  const isEmpty = useStore(visibleTickets$.pipe(
    map(tickets => tickets.length === 0),
    distinctUntilChanged(),
  ));

  return (
    <StyledTickets>
      {!appReady && Array(5).fill(null).map((_, idx) => <TicketSkeleton key={idx} />)}
      {appReady && isEmpty && <Info>Ничего не найдено</Info>}
      {tickets.map((ticket, idx) => <Ticket key={idx} ticket={ticket} />)}
    </StyledTickets>
  );
}

export default TicketsList;
