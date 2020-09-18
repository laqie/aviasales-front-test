import { $searchId, $stop, $tickets, fetchSearchIdFx, fetchTicketsFx, TicketsGate } from '.';
import api from '../../api';
import { forward, guard, sample } from 'effector';


fetchSearchIdFx.use(async () => {
  return api.search();
});

fetchTicketsFx.use(async (searchId) => {
  return api.tickets(searchId);
});

$tickets
  .on(fetchTicketsFx.doneData, (state, { tickets }) => state.concat(tickets));

$searchId
  .on(fetchSearchIdFx.doneData, (_, { searchId }) => searchId);

$stop
  .on(fetchTicketsFx.doneData, (_, { stop }) => stop);


forward({
  from: TicketsGate.open,
  to: fetchSearchIdFx,
});

sample({
  source: $searchId,
  clock: fetchSearchIdFx.done,
  fn: searchId => searchId,
  target: fetchTicketsFx,
});

sample({
  source: $searchId,
  clock: guard({
    source: fetchTicketsFx.done,
    filter: $stop.map(s => !s),
  }),
  fn: searchId => searchId,
  target: fetchTicketsFx,
});


fetchTicketsFx.watch(payload => {
  console.log(`fetchTicketsFx called with ${payload}`);
});
