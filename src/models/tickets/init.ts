import { forward, guard, sample } from 'effector';
import api from '../../api';
import { AppGate } from '../app';
import { $searchId, $stop, $tickets, fetchSearchIdFx, fetchTickets, fetchTicketsFx } from '.';


const MAX_RETRIES = 3;

$tickets
  .on(fetchTicketsFx.doneData, (state, { tickets }) => state.concat(tickets));

$searchId
  .on(fetchSearchIdFx.doneData, (_, { searchId }) => searchId);

$stop
  .on(fetchTicketsFx.doneData, (_, { stop }) => stop);


fetchSearchIdFx.use(async () => {
  return api.getSearchId();
});

fetchTicketsFx.use(async (searchId) => {
  let currentRetries = MAX_RETRIES;
  while (true) {
    try {
      return await api.getTickets(searchId);
    } catch (e) {
      if (e.status === 500 && currentRetries > 0) {
        currentRetries--;
        continue;
      }
      throw e;
    }
  }
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

// Continue loading tickets while stop is not true
guard({
  source: fetchTicketsFx.done,
  filter: $stop.map(s => !s),
  target: fetchTickets,
});
