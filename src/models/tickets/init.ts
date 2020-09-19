import { combine, forward, guard, sample } from 'effector';
import {
  $retries,
  $searchId,
  $stop,
  $stopFilters,
  $tickets,
  fetchSearchIdFx,
  fetchTicketsFx,
  setAllStopFilters,
  TicketsGate,
  toggleStopFilter,
  updateStopFilters,
} from '.';
import api from '../../api';


$tickets
  .on(fetchTicketsFx.doneData, (state, { tickets }) => state.concat(tickets));

$searchId
  .on(fetchSearchIdFx.doneData, (_, { searchId }) => searchId);

$stop
  .on(fetchTicketsFx.doneData, (_, { stop }) => stop);

$retries
  .on(fetchTicketsFx.fail, v => v + 1)
  .reset(fetchTicketsFx.done);

$stopFilters
  .on(updateStopFilters.doneData, (state, stops) => {
    for (const stop of stops) {
      if (!state.some(f => f.stops === stop)) {
        state = state.concat({
          stops: stop,
          active: true,
        });
      }
    }
    return [...state].sort((a, b) => a.stops - b.stops);
  })
  .on(toggleStopFilter, (state, stops) => state.map(f => f.stops === stops ? { ...f, active: !f.active } : f))
  .on(setAllStopFilters, (state, active) => state.map(f => ({ ...f, active: active })));

fetchSearchIdFx.use(async () => {
  return api.getSearchId();
});

fetchTicketsFx.use(async (searchId) => {
  return api.getTickets(searchId);
});

updateStopFilters.use(({ tickets }) => {
  return Array.from(tickets
    .map(ticket => ticket.segments.map(segment => segment.stops.length))
    .reduce((set, stops) => {
      for (const stop of stops) {
        set.add(stop);
      }
      return set;
    }, new Set<number>()));
});

// Start loading searchId on App mounted
forward({
  from: TicketsGate.open,
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


forward({
  from: fetchTicketsFx.doneData,
  to: updateStopFilters,
});
