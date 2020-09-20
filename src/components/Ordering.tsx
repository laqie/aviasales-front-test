import React from 'react';
import { useStore } from 'effector-react';

import { Ordering as IOrdering } from '../types';
import { OrderingButton, StyledOrdering } from './Ordering.sc';
import { $ordering, setOrdering } from '../models/ordering';


function Ordering() {
  const currentOrdering = useStore($ordering);
  const handleOrderingClick = (ordering: IOrdering) => () => setOrdering(ordering);

  return (
    <StyledOrdering>
      <OrderingButton
        onClick={handleOrderingClick('price')}
        disabled={currentOrdering === 'price'}>
        Самый дешевый
      </OrderingButton>
      <OrderingButton
        onClick={handleOrderingClick('time')}
        disabled={currentOrdering === 'time'}>
        Самый быстрый
      </OrderingButton>
    </StyledOrdering>
  );
}

export default Ordering;
