import { map, skip } from 'rxjs/operators';
import { fetchSearchId, fetchTicketsUntilStop } from '../../api';
import { appMounted$ } from '../app';
import { fetchSearchIdFx$, fetchTicketsFx$, searchId$, tickets$ } from './index';
import { transformTicket } from '../../utils/ticket';


fetchSearchIdFx$.setHandler(fetchSearchId);

fetchTicketsFx$.setHandler(fetchTicketsUntilStop);

searchId$.on(fetchSearchIdFx$.result$.pipe(
  map(result => result.searchId),
), (_, searchId) => searchId);

tickets$.on(fetchTicketsFx$.result$.pipe(
  map(result => result.tickets),
), (state, tickets) => state.concat(tickets.map(transformTicket)));

appMounted$
  .subscribe(fetchSearchIdFx$.trigger);

searchId$.pipe(
  skip(1),
).subscribe(fetchTicketsFx$.trigger);
