import { createEvent, restore } from 'effector';
import { Ordering } from '../../types';


export const setOrdering = createEvent<Ordering>();
export const $ordering = restore(setOrdering, 'price');
