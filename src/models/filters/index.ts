import { createEffect, createEvent, createStore } from 'effector';
import { StopFilter, TicketsResponse } from '../../types';


export const $stopFilters = createStore<StopFilter[]>([]);
export const $allStopFiltersActive = $stopFilters.map(filters => filters.every(filter => filter.active));
export const toggleStopFilter = createEvent<number>();
export const setAllStopFilters = createEvent<boolean>();
export const updateStopFilters = createEffect<TicketsResponse, number[]>();
