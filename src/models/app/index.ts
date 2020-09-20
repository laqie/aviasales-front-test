import { createGate } from 'effector-react';
import { createStore } from 'effector';
import { $stop } from '../tickets';


export const AppGate = createGate();
export const $appReady = createStore<boolean>(false);
export const $pending = $stop.map(v => !v);
