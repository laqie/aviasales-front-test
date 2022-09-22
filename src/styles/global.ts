import { normalize } from 'stitches-normalize-css';
import { globalCss } from '../stitches.config';


export const globalStyles = globalCss(...normalize, {
  'body': {
    m: 0,
    backgroundColor: '$blue100',
    fontFamily: '$default',
    fontSize: '$md',
    color: '$gray500',
  },
});
