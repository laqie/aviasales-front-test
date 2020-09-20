import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppGate } from './models/app';

import { Aside, Content, Header, Main, StyledApp } from './App.sc';
import theme from './styles/theme';
import GlobalStyles from './styles/global';
import TicketsList from './components/TicketsList';
import Ordering from './components/Ordering';
import Filters from './components/Filters';
import Logo from './components/Logo';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <AppGate />
        <Header>
          <a href="/">
            <Logo />
          </a>
        </Header>
        <Main>
          <Aside>
            <Filters />
          </Aside>
          <Content>
            <Ordering />
            <TicketsList />
          </Content>
        </Main>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
