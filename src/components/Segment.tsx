import React from 'react';

import { Segment as ISegment } from '../types';
import { addMinutes, getFormattedTime, humanizeMinutes, stopsFormatter } from '../utils';
import { PartBody, PartHeader, SegmentPart, StyledSegment } from './Segment.sc';


interface SegmentProps {
  segment: ISegment;
}

function Segment({ segment }: SegmentProps) {
  const date = new Date(segment.date);

  return (
    <StyledSegment>
      <SegmentPart>
        <PartHeader>
          {segment.origin}&nbsp;–&nbsp;{segment.destination}
        </PartHeader>
        <PartBody>
          {getFormattedTime(date)}&nbsp;–&nbsp;{getFormattedTime(addMinutes(date, segment.duration))}
        </PartBody>
      </SegmentPart>
      <SegmentPart>
        <PartHeader>
          В пути
        </PartHeader>
        <PartBody>
          {humanizeMinutes(segment.duration)}
        </PartBody>
      </SegmentPart>
      <SegmentPart>
        <PartHeader>
          {stopsFormatter(segment.stops.length)}
        </PartHeader>
        <PartBody>
          {segment.stops.join(', ') || 'Прямой'}
        </PartBody>
      </SegmentPart>
    </StyledSegment>
  );
}

export default Segment;
