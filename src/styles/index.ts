import { keyframes } from '../stitches.config';


const pulse = keyframes({
  '0%, 75%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});
export const skeleton = (width: string, height: string) => ({
  width,
  height,
  backgroundColor: '$skeleton',
  borderRadius: '$xs',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});
