import { OrderingType } from '../../types';
import { ObservableEvent, restore } from '@carex/core';


export const setOrdering$ = new ObservableEvent<OrderingType>();
export const ordering$ = restore(setOrdering$, 'price');

