import { ObservableEvent, ObservableStore } from '@carex/core';
import { StopFilter } from '../../types';
import { distinctUntilChanged, map } from 'rxjs/operators';


export const stopFilters$ = new ObservableStore<StopFilter[]>([]);

export const isAllStopFiltersActive$ = stopFilters$.pipe(
  map(filters => filters.every(filter => filter.active)),
  distinctUntilChanged(),
);

export const setAllStopFilters$ = new ObservableEvent<boolean>();
export const toggleStopFilter$ = new ObservableEvent<number>();
