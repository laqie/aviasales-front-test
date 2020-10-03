import { Ordering } from '../../types';
import { ObservableEvent, restore } from '@carex/core';


export const setOrdering$ = new ObservableEvent<Ordering>();
export const ordering$ = restore(setOrdering$, 'price');

