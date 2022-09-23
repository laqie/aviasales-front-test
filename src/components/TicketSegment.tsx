import { styled } from '../stitches.config';
import { addMinutes, getFormattedTime, humanizeMinutes, stopsFormatter } from '../utils';
import { ISegment } from '../types';


interface TicketSegmentProps {
  segment: ISegment;
}

function TicketSegment({ segment }: TicketSegmentProps) {
  const date = new Date(segment.date);
  return (
    <Container>
      <Column>
        <Title>
          {segment.origin}&nbsp;–&nbsp;{segment.destination}
        </Title>
        <Text>
          {getFormattedTime(date)}&nbsp;–&nbsp;{getFormattedTime(addMinutes(date, segment.duration))}
        </Text>
      </Column>
      <Column>
        <Title>
          В пути
        </Title>
        <Text>
          {humanizeMinutes(segment.duration)}
        </Text>
      </Column>
      <Column>
        <Title>
          {stopsFormatter(segment.stops.length)}
        </Title>
        <Text>
          {segment.stops.join(', ') || 'Прямой'}
        </Text>
      </Column>
    </Container>
  );
}

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 0.9fr 1.1fr',
});

const Column = styled('div', {
  display: 'grid',
  gridAutoColumns: '1fr',
  gridGap: '$xs',
});

const Title = styled('div', {
  fontSize: '$sm',
  fontWeight: 600,
  color: '$textMuted',
  textTransform: 'uppercase',
});

const Text = styled('div', {
  fontWeight: 600,
});


TicketSegment.Container = Container;
TicketSegment.Column = Column;
TicketSegment.Title = Title;
TicketSegment.Text = Text;

export default TicketSegment;
