import React from 'react';
import { useList } from 'effector-react';
import { $visibleTickets } from '../models/tickets';
import Ticket from './Ticket';
import styled from 'styled-components';


const StyledTickets = styled.ul`
   list-style: none;
   padding: 0;   
   display: flex;
   flex-direction: column;
`;

function Tickets() {
  return (
    <StyledTickets>
      {useList($visibleTickets, ticket => <Ticket ticket={ticket} />)}
    </StyledTickets>
  );
}

export default Tickets;
