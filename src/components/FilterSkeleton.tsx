import React from 'react';
import { CheckBox, StyledFilter } from './Filter.sc';
import { LabelSkeleton } from './FilterSkeleton.sc';


function FilterSkeleton() {
  return (
    <StyledFilter>
      <CheckBox
        type="checkbox"
        disabled={true}
        defaultChecked={false} />
      <LabelSkeleton />
    </StyledFilter>
  );
}

export default FilterSkeleton;
