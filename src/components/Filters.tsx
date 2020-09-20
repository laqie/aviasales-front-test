import React from 'react';
import { useList, useStore } from 'effector-react';

import { stopsFormatter } from '../utils';

import { StyledFilters, Title } from './Filters.sc';
import FilterSkeleton from './FilterSkeleton';
import Filter from './Filter';
import { $allStopFiltersActive, $stopFilters, setAllStopFilters, toggleStopFilter } from '../models/filters';
import { $appReady } from '../models/app';


function Filters() {
  const allFiltersActive = useStore($allStopFiltersActive);
  const appReady = useStore($appReady);

  return (
    <StyledFilters>
      <Title>Количество пересадок</Title>
      <Filter isActive={allFiltersActive} onChange={() => setAllStopFilters(!allFiltersActive)}>
        Все
      </Filter>
      {!appReady && Array(3).fill(null).map((_, idx) => <FilterSkeleton key={idx} />)}
      {useList($stopFilters, (filter) => (
        <Filter isActive={filter.active} onChange={() => toggleStopFilter(filter.stops)}>
          {stopsFormatter(filter.stops)}
        </Filter>
      ))}
    </StyledFilters>
  );
}

export default Filters;
