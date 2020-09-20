import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { getThemePath } from '.';


const GlobalStyles = createGlobalStyle`
  ${normalize}
  
  body {
    background-color: ${getThemePath('colors.lightBlue')};
    font-family: ${getThemePath('font.family')};
    font-size: ${getThemePath('font.size.default')};
    color: ${getThemePath('colors.text')};
  }
`;

export default GlobalStyles;
