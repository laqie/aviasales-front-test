import { forward, guard, sample } from 'effector';
import api from '../../api';
import { AppGate } from '../app';
import { $retries, $searchId, $stop, $tickets, fetchSearchIdFx, fetchTickets, fetchTicketsFx } from '.';


const MAX_RETRIES = 3;


$tickets
  .on(fetchTicketsFx.doneData, (state, { tickets }) => state.concat(tickets));

$searchId
  .on(fetchSearchIdFx.doneData, (_, { searchId }) => searchId);

$stop
  .on(fetchTicketsFx.doneData, (_, { stop }) => stop);

$retries
  .on(fetchTicketsFx.fail, v => v + 1)
  .reset(fetchTicketsFx.done);


fetchSearchIdFx.use(async () => {
  return api.getSearchId();
});

fetchTicketsFx.use(async (searchId) => {
  return api.getTickets(searchId);
});


// Start loading searchId on App mounted
forward({
  from: AppGate.open,
  to: fetchSearchIdFx,
});

// Map $searchId to fetchTicketsFx when fetchTickets triggered
sample({
  source: $searchId,
  clock: fetchTickets,
  fn: searchId => searchId,
  target: fetchTicketsFx,
});

// Start loading tickets when searchId has been loaded
forward({
  from: fetchSearchIdFx.done,
  to: fetchTickets,
});

// Continue loading tickets while stop is true
guard({
  source: fetchTicketsFx.done,
  filter: $stop.map(s => !s),
  target: fetchTickets,
});

// Retry fetchTicketsFx if previous request failed with
// status 500 and retries less then MAX_RETRIES
guard({
  source: sample({
    source: $retries,
    clock: guard({
      source: fetchTicketsFx.failData,
      filter: error => error.status === 500,
    }),
  }),
  filter: (retries: number) => retries <= MAX_RETRIES,
  target: fetchTickets,
});
