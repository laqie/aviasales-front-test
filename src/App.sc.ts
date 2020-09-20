import styled from 'styled-components';
import LogoUrl from './assets/images/Logo.svg';
import { getThemePath } from './styles';


export const StyledApp = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${getThemePath('spacing.huge')} 0;
`;

export const Logo = styled.span`
  width: 60px;
  height: 60px;
  display: inline-block;
  background-size: contain;
  background: url("${LogoUrl}") no-repeat center center;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
`;

export const Aside = styled.aside`
  margin-right: ${getThemePath('spacing.large')};
  min-width: 232px;
`;

export const Content = styled.div`
  max-width: 502px;
  flex: 1;
`;
