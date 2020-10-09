import api from '../../api';
import { appMounted$ } from '../app';
import { fetchSearchIdFx$, fetchTicketsFx$, searchId$, tickets$ } from './index';
import { pluck, skip, take } from 'rxjs/operators';
import { transformTicket } from '../../utils/ticket';


fetchSearchIdFx$.setHandler(api.fetchSearchId);

fetchTicketsFx$.setHandler(api.fetchTicketsUntilStop);

searchId$.on(fetchSearchIdFx$.result$.pipe(
  pluck('searchId'),
), (_, searchId) => searchId);

tickets$.on(fetchTicketsFx$.result$.pipe(
  pluck('tickets'),
), (state, tickets) => state.concat(tickets.map(transformTicket)));

appMounted$.pipe(
  take(1),
).subscribe(fetchSearchIdFx$.trigger);

searchId$.pipe(
  skip(1),
  take(1),
).subscribe(fetchTicketsFx$.trigger);
