import { useStore } from '@carex/react';
import { styled } from '../stitches.config';
import { ordering$, setOrdering$ } from '../models/ordering';
import { OrderingType } from '../types';


function Ordering() {
  const currentOrdering = useStore(ordering$);
  const handleOrderingClick = (ordering: OrderingType) => () => setOrdering$.trigger(ordering);

  return (
    <Container>
      <Button
        aria-label="Price Ordering"
        onClick={handleOrderingClick('price')}
        disabled={currentOrdering === 'price'}>
        Самый дешевый
      </Button>
      <Button
        aria-label="Time Ordering"
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
  color: '$text',
  backgroundColor: '$cardBg',
  textTransform: 'uppercase',
  outline: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '$border',
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
    backgroundColor: '$accent',
    color: '$cardBg',
    borderColor: '$accent',
    cursor: 'default',
  },
});


Ordering.Container = Container;
Ordering.Button = Button;

export default Ordering;
