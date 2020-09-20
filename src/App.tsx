import React from 'react';

import { AppGate } from './models/app';
import { Aside, Content, Header, Main, StyledApp } from './App.sc';
import TicketsList from './components/TicketsList';
import Ordering from './components/Ordering';
import Filters from './components/Filters';
import Logo from './components/Logo';


function App() {
  return (
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
  );
}

export default App;
