import React from 'react';
import { $filter, setFilter } from '../models/tickets';
import { useStore } from 'effector-react';
import { Filter } from '../types';
import styled from 'styled-components';


const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`

function Filters() {
  const filterValue = useStore($filter);
  const isActive = (filter: Filter) => Boolean(filterValue & filter);
  const filterHandler = (filter: Filter) => () => {
    if (filter === Filter.All && filterValue !== Filter.All && filterValue !== Filter.None) {
      setFilter(Filter.All);
    } else if (isActive(filter)) {
      setFilter(filterValue & ~filter);
    } else {
      setFilter(filterValue | filter);
    }
  };


  return (
    <StyledFilters>
      <Title>Количество пересадок</Title>
      <label>
        <input
          type="checkbox"
          onChange={filterHandler(Filter.All)}
          checked={filterValue === Filter.All} />
        Все
      </label>
      <label>
        <input
          type="checkbox"
          onChange={filterHandler(Filter.NoStops)}
          checked={isActive(Filter.NoStops)} />
        Без пересадок
      </label>
      <label>
        <input
          type="checkbox"
          onChange={filterHandler(Filter.OneStop)}
          checked={isActive(Filter.OneStop)} />
        1 пересадка
      </label>
      <label>
        <input
          type="checkbox"
          onChange={filterHandler(Filter.TwoStops)}
          checked={isActive(Filter.TwoStops)} />
        2 пересадки
      </label>
      <label>
        <input
          type="checkbox"
          onChange={filterHandler(Filter.ThreeStops)}
          checked={isActive(Filter.ThreeStops)} />
        3 пересадки
      </label>

    </StyledFilters>
  );
}

export default Filters;
