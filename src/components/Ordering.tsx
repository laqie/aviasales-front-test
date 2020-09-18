import React from 'react';
import {Ordering as IOrdering} from '../types';
import { $ordering, setOrdering } from '../models/tickets';
import { useStore } from 'effector-react';


function Ordering() {
  const currentOrdering = useStore($ordering);

  const orderingHandler = (ordering: IOrdering) => () => setOrdering(ordering);

  return (
    <div>
      <button
        onClick={orderingHandler('time')}
        disabled={currentOrdering === 'time'}>
        By Time
      </button>
      <button
        onClick={orderingHandler('price')}
        disabled={currentOrdering === 'price'}>
        By Price
      </button>
    </div>
  );
}

export default Ordering;
