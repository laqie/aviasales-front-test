import React from 'react';
import { useList, useStore } from '@carex/react';

import { visibleTickets$ } from '../models/tickets';
import { Info, StyledTickets } from './TicketsList.sc';
import TicketSkeleton from './TicketSkeleton';
import Ticket from './Ticket';
import { appReady$ } from '../models/app';
import { distinctUntilChanged, map } from 'rxjs/operators';


function TicketsList() {
  const appReady = useStore(appReady$);
  const isEmpty = useStore(visibleTickets$.pipe(
    map(tickets => tickets.length === 0),
    distinctUntilChanged(),
  ));

  return (
    <StyledTickets>
      {!appReady && Array.from({ length: 5 }, (_, idx) => <TicketSkeleton key={idx} />)}
      {appReady && isEmpty && <Info>Ничего не найдено</Info>}
      {useList(visibleTickets$, ticket => <Ticket ticket={ticket} />)}
    </StyledTickets>
  );
}

export default TicketsList;
