import { styled } from '../stitches.config';
import { useStore } from '@carex/react';
import { ordering$, setOrdering$ } from '../models/ordering';
import { OrderingType } from '../types';


function Ordering() {
  const currentOrdering = useStore(ordering$);
  const handleOrderingClick = (ordering: OrderingType) => () => setOrdering$.trigger(ordering);

  return (
    <Container>
      <Button
        onClick={handleOrderingClick('price')}
        disabled={currentOrdering === 'price'}>
        Самый дешевый
      </Button>
      <Button
        onClick={handleOrderingClick('time')}
        disabled={currentOrdering === 'time'}>
        Самый быстрый
      </Button>
    </Container>
  );
}

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
});

const Button = styled('button', {
  fontSize: '$sm',
  fontFamily: '$default',
  fontWeight: 600,
  height: '50px',
  color: '$gray500',
  backgroundColor: '$white',
  textTransform: 'uppercase',
  outline: 'none',
  border: '1px solid $gray100',
  cursor: 'pointer',

  '&:not(:last-child)': {
    borderRight: 'none',
  },

  '&:first-child': {
    borderTopLeftRadius: '$sm',
    borderBottomLeftRadius: '$sm',
  },

  '&:last-child': {
    borderTopRightRadius: '$sm',
    borderBottomRightRadius: '$sm',
  },

  '&:disabled': {
    backgroundColor: '$blue500',
    color: '$white',
    borderColor: '$blue500',
    cursor: 'default',
  },
});

Ordering.Container = Container;
Ordering.Button = Button;

export default Ordering;
