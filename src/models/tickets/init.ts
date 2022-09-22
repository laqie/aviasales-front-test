import { pluck, skip } from 'rxjs/operators';
import { fetchSearchId, fetchTicketsUntilStop } from '../../api';
import { appMounted$ } from '../app';
import { fetchSearchIdFx$, fetchTicketsFx$, searchId$, tickets$ } from './index';
import { transformTicket } from '../../utils/ticket';


console.log('here');
fetchSearchIdFx$.setHandler(fetchSearchId);

fetchTicketsFx$.setHandler(fetchTicketsUntilStop);

searchId$.on(fetchSearchIdFx$.result$.pipe(
  pluck('searchId'),
), (_, searchId) => searchId);

tickets$.on(fetchTicketsFx$.result$.pipe(
  pluck('tickets'),
), (state, tickets) => state.concat(tickets.map(transformTicket)));

appMounted$
  .subscribe(fetchSearchIdFx$.trigger);

searchId$.pipe(
  skip(1),
).subscribe(fetchTicketsFx$.trigger);
