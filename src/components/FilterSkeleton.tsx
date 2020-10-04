import React from 'react';
import { InputCheckBox, StyledFilter } from './Filter.sc';
import { LabelSkeleton } from './FilterSkeleton.sc';
import { Checkbox } from './Filter';


function FilterSkeleton() {
  return (
    <StyledFilter>
      <InputCheckBox
        type="checkbox"
        disabled={true}
        defaultChecked={false} />
      <Checkbox active={false} />
      <LabelSkeleton />
    </StyledFilter>
  );
}

export default FilterSkeleton;
