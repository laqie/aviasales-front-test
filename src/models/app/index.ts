import { createGate } from 'effector-react';
import { combine, createStore } from 'effector';
import { fetchSearchIdFx, fetchTicketsFx } from '../tickets';


export const AppGate = createGate();
export const $appReady = createStore<boolean>(false);
export const $pending = combine(
  fetchTicketsFx.pending,
  fetchSearchIdFx.pending,
  (...args) => args.some(Boolean),
);
