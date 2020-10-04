import styled from 'styled-components';
import { getThemePath } from './styles';


export const StyledApp = styled.div`
  max-width: 960px;
  min-width: 320px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${getThemePath('spacing.huge')} 0;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 ${getThemePath('spacing.xSmall')};
  
  @media (min-width: 769px) {
    flex-direction: row;
    align-items: flex-start; 
  }
`;

export const Aside = styled.aside`
  min-width: 232px;
  max-width: 502px;
  width: 100%;
  margin-bottom: ${getThemePath('spacing.large')};
  
  @media (min-width: 769px) {
    width: auto;
    margin-right: ${getThemePath('spacing.large')}; 
  }

`;

export const Content = styled.div`
  max-width: 502px;
  flex: 1;
  width: 100%;
`;
