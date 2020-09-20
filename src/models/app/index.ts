import { createGate } from 'effector-react';
import { createStore } from 'effector';


export const AppGate = createGate();
export const $appReady = createStore<boolean>(false);
