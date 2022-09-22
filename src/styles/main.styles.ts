import { keyframes, css, styled } from '../stitches.config';


const pulse = keyframes({
  '0%, 75%': {
    backgroundColor: '$gray500',
  },
  '50%': {
    backgroundColor: '$gray200',
  },
});

export const skeleton = (width: string, height: string) => css({
  width,
  height,
  backgroundColor: '$gray500',
  borderRadius: '$xs',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const Container = styled('div', {
  maxWidth: '960px',
  minWidth: '320px',
  margin: '0 auto',
  boxSizing: 'border-box',
});
