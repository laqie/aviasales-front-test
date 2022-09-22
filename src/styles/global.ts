import { normalize } from 'stitches-normalize-css';
import { globalCss } from '../stitches.config';


export const globalStyles = globalCss(...normalize, {
  html: {
    height: '100vh',
    boxSizing: 'border-box',
  },
  body: {
    m: 0,
    height: '100%',
    boxSizing: 'border-box',
    fontFamily: '$default',
    fontSize: '$md',
    color: '$gray500',
    backgroundColor: '$blue100',
  },
});
