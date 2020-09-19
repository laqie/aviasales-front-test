import React, { PropsWithChildren } from 'react';
import { $filter, setFilter, toggleFilter } from '../models/tickets';
import { useStore } from 'effector-react';
import { Filter as IFilter } from '../types';
import styled from 'styled-components';
import Checkbox from '../assets/Checkbox.svg';
import CheckboxActive from '../assets/CheckboxActive.svg';
import { skeletonStyle } from '../styles/ui';


const StyledFilters = styled.div`
  display: flex;
  padding: 0;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  padding: 18px 0 0 21px;
  margin: 0 0 9px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;


const StyledCheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  margin-right: 12px;
  background: url("${Checkbox}");
  
  &:checked {
    background: url("${CheckboxActive}");
  }
`;

const StyledFilter = styled.label`
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

const SkeletonLabel = styled.span`
  ${skeletonStyle('auto', '13px')};
  flex: 0.8;
`;

interface FilterProps {
  isActive: boolean;
  onChange: () => void;
}

function Filter({ isActive, onChange, children }: PropsWithChildren<FilterProps>) {
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

function SkeletonFilter() {
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
  const filterValue = useStore($filter);
  const isActive = (filter: IFilter) => Boolean(filterValue & filter);
  const filterHandler = (filter: IFilter) => () => {
    toggleFilter(filter);
  };

  return (
    <StyledFilters>
      <Title>Количество пересадок</Title>
      <Filter
        onChange={filterHandler(IFilter.All)}
        isActive={filterValue === IFilter.All}>
        Все
      </Filter>
      {Array(4).fill(null).map((_, idx) => <SkeletonFilter key={idx} />)}
      <Filter
        onChange={filterHandler(IFilter.NoStops)}
        isActive={isActive(IFilter.NoStops)}>
        Без пересадок
      </Filter>
      <Filter
        onChange={filterHandler(IFilter.OneStop)}
        isActive={isActive(IFilter.OneStop)}>
        1 пересадка
      </Filter>
      <Filter
        onChange={filterHandler(IFilter.TwoStops)}
        isActive={isActive(IFilter.TwoStops)}>
        2 пересадки
      </Filter>
      <Filter
        onChange={filterHandler(IFilter.ThreeStops)}
        isActive={isActive(IFilter.ThreeStops)}>
        3 пересадки
      </Filter>
    </StyledFilters>
  );
}

export default Filters;
