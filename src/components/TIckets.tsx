import React from 'react';
import { useList, useStore } from 'effector-react';
import { $tickets, $visibleTickets } from '../models/tickets';
import Ticket, { TicketSkeleton } from './Ticket';
import styled from 'styled-components';


const StyledTickets = styled.ul`
   list-style: none;
   padding: 0;   
   display: flex;
   flex-direction: column;
`;

const NothingFound = styled.li`
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  margin: 3rem 0;
`


function Tickets() {
  const loading = useStore($tickets.map(tickets => tickets.length === 0));
  const isEmpty = useStore($visibleTickets.map(tickets => tickets.length === 0));
  return (
    <StyledTickets>
      {loading && Array(5).fill(null).map((_, idx) => <TicketSkeleton key={idx} />)}
      {!loading && isEmpty && <NothingFound>Ничего не найдено</NothingFound>}
      {useList($visibleTickets, ticket => <Ticket ticket={ticket} />)}
    </StyledTickets>
  );
}

export default Tickets;
