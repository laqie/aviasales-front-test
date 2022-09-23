import { useList, useStore } from '@carex/react';
import { styled } from '../stitches.config';
import { stopsFormatter } from '../utils';
import { isAllStopFiltersActive$, setAllStopFilters$, stopFilters$, toggleStopFilter$ } from '../models/filters';
import { appReady$ } from '../models/app';
import Filter from './Filter';
import FilterSkeleton from './FilterSkeleton';


function Filters() {
  const allFiltersActive = useStore(isAllStopFiltersActive$);
  const appReady = useStore(appReady$);
  return (
    <Container>
      <Title>Количество пересадок</Title>
      <Filter isActive={allFiltersActive} onChange={() => setAllStopFilters$.trigger(!allFiltersActive)}>
        Все
      </Filter>
      {!appReady && Array.from({ length: 3 }, (_, idx) => <FilterSkeleton key={idx} />)}
      {useList(stopFilters$, (filter) => (
        <Filter isActive={filter.active} onChange={() => toggleStopFilter$.trigger(filter.stops)}>
          {stopsFormatter(filter.stops)}
        </Filter>
      ))}
    </Container>
  );
}

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: 0,
  backgroundColor: '$cardBg',
  borderRadius: '$sm',
  boxShadow: '$card',
  pt: '$lg',
  pb: '$md',

  [`& ${Filter.Label}`]: {
    pl: '$lg',
  },
});

const Title = styled('h3', {
  fontWeight: 600,
  fontSize: '$sm',
  textTransform: 'uppercase',
  m: 0,
  mb: '$sm',
  p: '0 0 0 $lg',
});


Filters.Container = Container;
Filters.Title = Title;

export default Filters;
