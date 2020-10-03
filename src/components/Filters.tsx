import React from 'react';
import { useList, useStore } from '@carex/react';

import { stopsFormatter } from '../utils';
import { isAllStopFiltersActive$, setAllStopFilters$, stopFilters$, toggleStopFilter$ } from '../models/filters';
import { appReady$ } from '../models/app';
import { StyledFilters, Title } from './Filters.sc';
import FilterSkeleton from './FilterSkeleton';
import Filter from './Filter';


function Filters() {
  const allFiltersActive = useStore(isAllStopFiltersActive$);
  const appReady = useStore(appReady$);

  return (
    <StyledFilters>
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
    </StyledFilters>
  );
}

export default Filters;
