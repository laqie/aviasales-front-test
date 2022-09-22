import TicketCard from './TicketCard';
import TicketSegment from './TicketSegment';
import { styled } from '../stitches.config';
import { skeleton } from '../styles';


function TicketCardSkeleton() {
  return (
    <TicketCard.Container>
      <TicketCard.Header>
        <TicketCard.Price>
          <PriceSkeleton />
        </TicketCard.Price>
        <TicketCard.Carrier>
          <CarrierSkeleton />
        </TicketCard.Carrier>
      </TicketCard.Header>
      {Array(2).fill(null).map((_, idx) => (
        <TicketSegment.Container key={idx}>
          {Array(3).fill(null).map((_, idx) => (
            <TicketSegment.Column key={idx}>
              <TitleSkeleton />
              <TextSkeleton />
            </TicketSegment.Column>
          ))}
        </TicketSegment.Container>
      ))}
    </TicketCard.Container>
  );
}

const PriceSkeleton = styled('div', {
  ...skeleton('40%', '24px'),
});

const CarrierSkeleton = styled('div', {
  ...skeleton('90%', '39px'),
});

const TitleSkeleton = styled(TicketSegment.Title, {
  ...skeleton('50%', '13px'),
});

const TextSkeleton = styled(TicketSegment.Text, {
  ...skeleton('40%', '16px'),
});

TicketCardSkeleton.PriceSkeleton = PriceSkeleton;
TicketCardSkeleton.CarrierSkeleton = CarrierSkeleton;
TicketCardSkeleton.TitleSkeleton = TitleSkeleton;
TicketCardSkeleton.TextSkeleton = TextSkeleton;

export default TicketCardSkeleton;
