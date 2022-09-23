import { useList, useStore } from '@carex/react';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { styled } from '../stitches.config';
import { appReady$ } from '../models/app';
import { visibleTickets$ } from '../models/tickets';
import TicketCard from './TicketCard';
import TicketCardSkeleton from './TicketCardSkeleton';


function TicketsList() {
  const appReady = useStore(appReady$);
  const isEmpty = useStore(visibleTickets$.pipe(
    map(tickets => tickets.length === 0),
    distinctUntilChanged(),
  ));
  return (
    <Container>
      {!appReady && Array.from({ length: 5 }, (_, idx) => <TicketCardSkeleton key={idx} />)}
      {appReady && isEmpty && <Info>Ничего не найдено</Info>}
      {useList(visibleTickets$, ticket => <TicketCard ticket={ticket} />)}
    </Container>
  );
}

const Container = styled('article', {
  display: 'grid',
  gridAutoFlow: 'row',
  alignItems: 'start',
  rowGap: '$md',
});

const Info = styled('div', {
  textTransform: 'uppercase',
  fontWeight: 600,
  textAlign: 'center',
  my: '$xl',
});


TicketsList.Container = Container;
TicketsList.Info = Info;

export default TicketsList;
