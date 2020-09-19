import React from 'react';
import { Segment as ISegment, Ticket as ITicket } from '../types';
import styled, { css, keyframes } from 'styled-components';
import { lighten } from 'polished';
import { Theme } from '../styles/theme';
import { skeletonStyle } from '../styles/ui';


const StyledTicket = styled.li`
  max-width: 502px;
  background-color: white;
  padding: 19px 21px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  
  &:not(:last-child) {
    margin-bottom: 21px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 21px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue};
  flex: 3;
`;

const Carrier = styled.div`
  flex: 1.3;
`;

const StyledSegment = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  
  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

const SegmentPart = styled.div`
  flex: 1.5;
  
  &:last-child {
    flex: 1.3;
  }
`;

const PartHeader = styled.div`
   font-size: 12px;
   font-weight: 600;
   color: ${({ theme }) => theme.colors.textMuted};
   text-transform: uppercase;
   margin-bottom: 6px;
`;

const PartBody = styled.div`
  font-weight: 600;
`;

const getIATALogo = (iata: string) => `//pics.avs.io/99/36/${iata}.png`;

interface TicketProps {
  ticket: ITicket,
}

function Ticket({ ticket }: TicketProps) {
  return (
    <StyledTicket>
      <Header>
        <Price>{ticket.price.toLocaleString('ru')} Р</Price>
        <Carrier>
          <img src={getIATALogo(ticket.carrier)} alt={ticket.carrier} />
        </Carrier>
      </Header>
      {ticket.segments.map((segment, idx) => <Segment key={idx} segment={segment} />)}
    </StyledTicket>
  );
}

const divmod = (value: number, denominator: number): number[] => {
  return [Math.trunc(value / denominator), value % denominator];
};

const formatMinutes = (minutes: number): string => {
  let days, hours;
  [days, minutes] = divmod(minutes, 60 * 24);
  [hours, minutes] = divmod(minutes, 60);
  return [
    days ? `${days}д` : '',
    hours ? `${hours}ч` : '',
    minutes ? `${minutes}м` : '',
  ].join(' ');
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ru', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60 * Math.pow(10, 3));

};


const createCountFormatter = (one: string, two: string, few: string) => {
  const titles = [one, two, few];

  return (n: number) => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      n % 100 > 4 && n % 100 < 20
        ? 2
        : cases[n % 10 < 5 ? n % 10 : 5]
      ];
  };
};

const stopFormatter = createCountFormatter('пересадка', 'пересадки', 'пересадок');


interface SegmentProps {
  segment: ISegment;
}


function Segment({ segment }: SegmentProps) {
  const date = new Date(segment.date);
  return (
    <StyledSegment>
      <SegmentPart>
        <PartHeader>
          {segment.origin} – {segment.destination}
        </PartHeader>
        <PartBody>
          {formatTime(date)} – {formatTime(addMinutes(date, segment.duration))}
        </PartBody>
      </SegmentPart>
      <SegmentPart>
        <PartHeader>
          В пути
        </PartHeader>
        <PartBody>
          {formatMinutes(segment.duration)}
        </PartBody>
      </SegmentPart>
      <SegmentPart>
        <PartHeader>
          {segment.stops.length ? segment.stops.length : 'Без'} {stopFormatter(segment.stops.length)}
        </PartHeader>
        <PartBody>
          {segment.stops.join(', ') || 'Прямой'}
        </PartBody>
      </SegmentPart>
    </StyledSegment>
  );
}




const SkeletonPrice = styled.div`
  ${skeletonStyle('40%', '24px')};
`;

const SkeletonCarrier = styled.div`
  ${skeletonStyle('90%', '39px')};
`;

const SkeletonPartHeader = styled(PartHeader)`
  ${skeletonStyle('50%', '13px')};
`;

const SkeletonPartBody = styled(PartBody)`
  ${skeletonStyle('40%', '16px')};
`;

export function TicketSkeleton() {
  return (
    <StyledTicket>
      <Header>
        <Price>
          <SkeletonPrice />
        </Price>
        <Carrier>
          <SkeletonCarrier />
        </Carrier>
      </Header>
      {Array(2).fill(null).map((_, idx) => {
        return (
          <StyledSegment key={idx}>
            {Array(3).fill(null).map((_, idx) => {
              return (
                <SegmentPart key={idx}>
                  <SkeletonPartHeader />
                  <SkeletonPartBody />
                </SegmentPart>
              );
            })}
          </StyledSegment>
        );
      })}
    </StyledTicket>
  );
}

export default Ticket;
