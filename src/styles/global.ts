import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  ${normalize}
  
  body {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default GlobalStyles;
