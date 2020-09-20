import React from 'react';
import { Carrier, Header, Price, StyledTicket } from './Ticket.sc';
import { SegmentPart, StyledSegment } from './Segment.sc';
import { CarrierSkeleton, PartBodySkeleton, PartHeaderSkeleton, PriceSkeleton } from './TicketSkeleton.sc';


function TicketSkeleton() {
  return (
    <StyledTicket>
      <Header>
        <Price>
          <PriceSkeleton />
        </Price>
        <Carrier>
          <CarrierSkeleton />
        </Carrier>
      </Header>
      {Array(2).fill(null).map((_, idx) => (
        <StyledSegment key={idx}>
          {Array(3).fill(null).map((_, idx) => (
            <SegmentPart key={idx}>
              <PartHeaderSkeleton />
              <PartBodySkeleton />
            </SegmentPart>
          ))}
        </StyledSegment>
      ))}
    </StyledTicket>
  );
}

export default TicketSkeleton;
