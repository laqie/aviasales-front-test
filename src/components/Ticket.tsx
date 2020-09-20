import React from 'react';

import { Ticket as ITicket } from '../types';
import { Carrier, Header, Price, StyledTicket } from './Ticket.sc';
import Segment from './Segment';
import { getIATALogoUrl } from '../utils/ticket';


interface TicketProps {
  ticket: ITicket,
}

function Ticket({ ticket }: TicketProps) {
  return (
    <StyledTicket>
      <Header>
        <Price>{ticket.price.toLocaleString('ru')} Р</Price>
        <Carrier>
          <img src={getIATALogoUrl(ticket.carrier)} alt={ticket.carrier} />
        </Carrier>
      </Header>
      {ticket.segments.map((segment, idx) => <Segment key={idx} segment={segment} />)}
    </StyledTicket>
  );
}


export default Ticket;
