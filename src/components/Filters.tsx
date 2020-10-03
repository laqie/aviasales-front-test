import React from 'react';
import { useStore } from '@carex/react';

import { stopsFormatter } from '../utils';

import { StyledFilters, Title } from './Filters.sc';
import FilterSkeleton from './FilterSkeleton';
import Filter from './Filter';
import { isAllStopFiltersActive$, setAllStopFilters$, stopFilters$, toggleStopFilter$ } from '../models/filters';
import { appReady$ } from '../models/app';


function Filters() {
  const allFiltersActive = useStore(isAllStopFiltersActive$);
  const stopFilters = useStore(stopFilters$);
  const appReady = useStore(appReady$);

  return (
    <StyledFilters>
      <Title>Количество пересадок</Title>
      <Filter isActive={allFiltersActive} onChange={() => setAllStopFilters$.trigger(!allFiltersActive)}>
        Все
      </Filter>
      {!appReady && Array(3).fill(null).map((_, idx) => <FilterSkeleton key={idx} />)}
      {stopFilters.map((filter, idx) => (
        <Filter key={idx} isActive={filter.active} onChange={() => toggleStopFilter$.trigger(filter.stops)}>
          {stopsFormatter(filter.stops)}
        </Filter>
      ))}
    </StyledFilters>
  );
}

export default Filters;
