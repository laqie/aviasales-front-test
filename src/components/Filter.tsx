import { styled } from '../stitches.config';
import { PropsWithChildren } from 'react';
import Checkbox from './Checkbox';


interface FilterProps {
  isActive: boolean;
  onChange: () => void;
}

function Filter({ isActive, onChange, children }: PropsWithChildren<FilterProps>) {
  return (
    <Label>
      <Input
        type="checkbox"
        onChange={onChange}
        checked={isActive}
      />
      <Checkbox isActive={isActive} />
      {children}
    </Label>
  );
}

const Label = styled('label', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '$sm',
  alignItems: 'center',
  py: '$sm',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$filterHover',
  },
});

const Input = styled('input', {
  display: 'none',
});


Filter.Label = Label;
Filter.Input = Input;

export default Filter;
