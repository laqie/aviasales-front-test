import { ObservableEvent, ObservableStore } from '@carex/core';
import { IStopFilter } from '../../types';
import { distinctUntilChanged, map } from 'rxjs/operators';


export const stopFilters$ = new ObservableStore<IStopFilter[]>([]);
export const activeFiltersStops$ = stopFilters$.pipe(
  map(filters => filters
    .filter(filter => filter.active)
    .map(filter => filter.stops),
  ),
);

export const isAllStopFiltersActive$ = stopFilters$.pipe(
  map(filters => filters.every(filter => filter.active)),
  distinctUntilChanged(),
);

export const setAllStopFilters$ = new ObservableEvent<boolean>();
export const toggleStopFilter$ = new ObservableEvent<number>();
