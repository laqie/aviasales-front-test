import { ObservableEvent, ObservableStore } from '@carex/core';
import { combineLatest } from 'rxjs';
import { fetchSearchIdFx$, fetchTicketsFx$ } from '../tickets';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


export const appMounted$ = new ObservableEvent();
export const appReady$ = new ObservableStore(false);
export const pending$ = combineLatest(
  [fetchTicketsFx$.pending$, fetchSearchIdFx$.pending$],
).pipe(
  map(states => states.some(Boolean)),
  distinctUntilChanged(),
  debounceTime(100),
);
