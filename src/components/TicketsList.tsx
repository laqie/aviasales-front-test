import React from 'react';
import { useList, useStore } from 'effector-react';

import { $visibleTickets } from '../models/tickets';
import { Info, StyledTickets } from './TicketsList.sc';
import TicketSkeleton from './TicketSkeleton';
import Ticket from './Ticket';
import { $appReady } from '../models/app';


function TicketsList() {
  const appReady = useStore($appReady);
  const isEmpty = useStore($visibleTickets.map(tickets => tickets.length === 0));
  return (
    <StyledTickets>
      {!appReady && Array(5).fill(null).map((_, idx) => <TicketSkeleton key={idx} />)}
      {appReady && isEmpty && <Info>Ничего не найдено</Info>}
      {useList($visibleTickets, ticket => <Ticket ticket={ticket} />)}
    </StyledTickets>
  );
}

export default TicketsList;
