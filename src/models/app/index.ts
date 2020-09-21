import { createGate } from 'effector-react';
import { combine, createStore, restore } from 'effector';
import { debounce } from '../../utils/effector';
import { fetchSearchIdFx, fetchTicketsFx } from '../tickets';


export const AppGate = createGate<void>();
export const $appReady = createStore<boolean>(false);
export const $pending = restore(
  debounce({
    source: combine(
      fetchTicketsFx.pending,
      fetchSearchIdFx.pending,
      (...args) => args.some(Boolean),
    ),
    ms: 100,
  }),
  true,
);
