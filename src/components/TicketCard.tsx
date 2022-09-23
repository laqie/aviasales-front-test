import { styled } from '../stitches.config';
import { ITicket } from '../types';
import { getIATALogoUrl } from '../utils/ticket';
import TicketSegment from './TicketSegment';


interface TicketCardProps {
  ticket: ITicket,
}

function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Container>
      <Header>
        <Price>{ticket.price.toLocaleString('ru')} Р</Price>
        <Carrier>
          <img src={getIATALogoUrl(ticket.carrier)} width="99" height="36" alt={ticket.carrier} />
        </Carrier>
      </Header>
      {ticket.segments.map((segment, idx) => <TicketSegment key={idx} segment={segment} />)}
    </Container>
  );
}

const Container = styled('section', {
  backgroundColor: '$cardBg',
  borderRadius: '$sm',
  boxShadow: '$card',
  p: '$lg',
  display: 'grid',
  gridAutoColumns: '1fr',
  gridGap: '$md',
});

const Header = styled('div', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'start',
  gridTemplateColumns: '1.9fr 1.1fr',
  mb: '$sm',
});

const Price = styled('h3', {
  fontSize: '$xl',
  fontWeight: 600,
  color: '$accent',
  m: 0,
  p: 0,
});

const Carrier = styled('div', {});


TicketCard.Container = Container;
TicketCard.Header = Header;
TicketCard.Price = Price;
TicketCard.Carrier = Carrier;

export default TicketCard;
