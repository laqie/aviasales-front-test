import React, { PropsWithChildren } from 'react';
import {
  $allStopFiltersActive,
  $stopFilters,
  setAllStopFilters,
  StopFilter,
  toggleStopFilter,
} from '../models/tickets';
import { useList, useStore } from 'effector-react';

import styled from 'styled-components';
import Checkbox from '../assets/Checkbox.svg';
import CheckboxActive from '../assets/CheckboxActive.svg';
import { skeletonStyle } from '../styles/ui';
import { stopFormatter } from './Ticket';


export const StyledFilters = styled.div`
  display: flex;
  padding: 0;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  margin-bottom: 1rem;
`;

export const Title = styled.p`
  padding: 18px 0 0 21px;
  margin: 0 0 9px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;


export const StyledCheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  margin-right: 12px;
  background: url("${Checkbox}");
  cursor: pointer;
  
  &:checked {
    background: url("${CheckboxActive}");
  }
`;

export const StyledFilter = styled.label`
  padding: 10px 21px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  
  &:last-child {
    margin-bottom: 10px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.paleBlue};
  }
`;

export const SkeletonLabel = styled.span`
  ${skeletonStyle('auto', '13px')};
  flex: 0.8;
`;

interface FilterProps {
  isActive: boolean;
  onChange: () => void;
}

export function Filter({ isActive, onChange, children }: PropsWithChildren<FilterProps>) {
  return (
    <StyledFilter>
      <StyledCheckBox
        type="checkbox"
        onChange={onChange}
        checked={isActive} />
      {children}
    </StyledFilter>
  );
}

export function SkeletonFilter() {
  return (
    <StyledFilter>
      <StyledCheckBox
        type="checkbox"
        disabled={true}
        defaultChecked={false} />
      <SkeletonLabel />
    </StyledFilter>
  );
}


function Filters() {
  const allActive = useStore($allStopFiltersActive);
  const loading = useStore($stopFilters.map(filters => filters.length === 0));
  return (
    <StyledFilters>
      <Title>Количество пересадок</Title>
      <Filter isActive={allActive} onChange={() => setAllStopFilters(!allActive)}>
        Все
      </Filter>
      {loading && Array(4).fill(null).map((_, idx) => <SkeletonFilter key={idx} />)}
      {useList($stopFilters, (filter) => (
        <Filter isActive={filter.active} onChange={() => toggleStopFilter(filter.stops)}>
          {stopFormatter(filter.stops)}
        </Filter>
      ))}

    </StyledFilters>
  );
}

export default Filters;
