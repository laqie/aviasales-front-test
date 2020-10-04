import React, { PropsWithChildren } from 'react';
import { InputCheckBox, StyledCheckBox, StyledFilter } from './Filter.sc';
import CheckboxIcon from '../assets/images/Checkbox.svg';
import CheckboxActiveIcon from '../assets/images/CheckboxActive.svg';


interface FilterProps {
  isActive: boolean;
  onChange: () => void;
}

export function Checkbox({ active }: { active: boolean }) {
  return (
    <StyledCheckBox>
      <img src={active ? CheckboxActiveIcon : CheckboxIcon} alt="" />
    </StyledCheckBox>
  );
}

function Filter({ isActive, onChange, children }: PropsWithChildren<FilterProps>) {
  return (
    <StyledFilter>
      <InputCheckBox
        type="checkbox"
        onChange={onChange}
        checked={isActive} />
      <Checkbox active={isActive} />
      {children}
    </StyledFilter>
  );
}

export default Filter;
