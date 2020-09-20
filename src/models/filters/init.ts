import { forward } from 'effector';
import { $stopFilters, setAllStopFilters, toggleStopFilter, updateStopFilters } from '.';
import { fetchTicketsFx } from '../tickets';


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

forward({
  from: fetchTicketsFx.doneData,
  to: updateStopFilters,
});
