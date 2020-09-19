import {
  $filter,
  $retries,
  $searchId,
  $stop,
  $tickets,
  fetchSearchIdFx,
  fetchTicketsFx,
  setFilter,
  TicketsGate,
  toggleFilter,
} from '.';
import api from '../../api';
import { combine, forward, guard, sample } from 'effector';
import { Filter as IFilter } from '../../types';


fetchSearchIdFx.use(async () => {
  return api.getSearchId();
});

fetchTicketsFx.use(async (searchId) => {
  return api.getTickets(searchId);
});

$filter
  .on(setFilter, (_, v) => v)
  .on(toggleFilter, (state, filter) => {
    const isActive = (filter: IFilter) => Boolean(state & filter);
    if (filter === IFilter.All && state !== IFilter.All && state !== IFilter.None) {
      return IFilter.All;
    } else if (isActive(filter)) {
      return state & ~filter;
    } else {
      return state | filter;
    }
  });

$tickets
  .on(fetchTicketsFx.doneData, (state, { tickets }) => state.concat(tickets));

$searchId
  .on(fetchSearchIdFx.doneData, (_, { searchId }) => searchId);

$stop
  .on(fetchTicketsFx.doneData, (_, { stop }) => stop);

$retries
  .on(fetchTicketsFx.fail, v => v + 1)
  .reset(fetchTicketsFx.done);

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

sample({
  source: guard({
    source: combine({
      searchId: $searchId,
      retries: $retries,
    }),
    filter: ({ retries }) => {
      return retries <= 3;
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
