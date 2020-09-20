import { combine, forward, guard, sample } from 'effector';
import { $retries, $searchId, $stop, $tickets, fetchSearchIdFx, fetchTicketsFx } from '.';
import api from '../../api';
import { AppGate } from '../app';


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

// Start loading tickets when searchId has been loaded
sample({
  source: $searchId,
  clock: fetchSearchIdFx.done,
  fn: searchId => searchId,
  target: fetchTicketsFx,
});

// Continue loading tickets while stop is true
sample({
  source: $searchId,
  clock: guard({
    source: fetchTicketsFx.done,
    filter: $stop.map(s => !s),
  }),
  fn: searchId => searchId,
  target: fetchTicketsFx,
});

// Retry fetchTicketsFx if previous request failed with
// status 500 and retries less then 4
sample({
  source: guard({
    source: combine({
      searchId: $searchId,
      retries: $retries,
    }),
    filter: ({ retries }) => {
      return retries < 4;
    },
  }),
  clock: guard({
    source: fetchTicketsFx.fail,
    filter: ({ error }) => {
      return error.status === 500;
    },
  }),
  fn: ({ searchId }) => searchId,
  target: fetchTicketsFx,
});
