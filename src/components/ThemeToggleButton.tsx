import { useStore } from '@carex/react';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { styled } from '../stitches.config';
import { isLightTheme$, toggleTheme$ } from '../models/app';


function ThemeToggleButton() {
  const isLightTheme = useStore(isLightTheme$);

  return (
    <Button onClick={() => toggleTheme$.trigger()} aria-label="Switch Theme">
      {isLightTheme ? <IconMoonStars size={22} /> : <IconSun size={22} />}
    </Button>
  );
}

const Button = styled('button', {
  background: 'none',
  border: 'none',
  backgroundColor: '$cardBg',
  borderRadius: '$round',
  color: '$toggleButtonIcon',
  width: '30px',
  height: '30px',
  p: 0,
  m: 0,
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '$card',
  '&:hover': {
    backgroundColor: '$toggleButtonHover',
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
});


ThemeToggleButton.Button = Button;

export default ThemeToggleButton;
