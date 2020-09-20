import React, { PropsWithChildren } from 'react';
import { CheckBox, StyledFilter } from './Filter.sc';


interface FilterProps {
  isActive: boolean;
  onChange: () => void;
}

function Filter({ isActive, onChange, children }: PropsWithChildren<FilterProps>) {
  return (
    <StyledFilter>
      <CheckBox
        type="checkbox"
        onChange={onChange}
        checked={isActive} />
      {children}
    </StyledFilter>
  );
}

export default Filter;
