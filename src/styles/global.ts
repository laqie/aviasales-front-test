import { createGlobalStyle } from 'styled-components';
import { getThemePath } from '.';
import { normalize } from 'stitches-normalize-css';
import { globalCss } from '../stitches.config';


const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${getThemePath('colors.lightBlue')};
    font-family: ${getThemePath('font.family')};
    font-size: ${getThemePath('font.size.default')};
    color: ${getThemePath('colors.text')};
  }
`;


export const globalStyles = globalCss(...normalize, {
  'body': {
    m: 0,
    backgroundColor: '$blue100',
    fontFamily: '$default',
    fontSize: '$md',
    color: '$gray500',
  },
});

export default GlobalStyles;
