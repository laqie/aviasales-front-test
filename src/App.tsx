import React from 'react';
import { useGate } from 'effector-react';
import { TicketsGate } from './models/tickets';
import Tickets from './components/TIckets';
import Ordering from './components/Ordering';

import styled from 'styled-components';

import LogoShadowFile from './assets/Logo.svg';
import Filters from './components/Filters';


const StyledApp = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`;

const Logo = styled.span`
  width: 60px;
  height: 60px;
  display: inline-block;
  background-size: contain;
  background: url(${LogoShadowFile}) no-repeat center center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
`;

const Aside = styled.aside`
  margin-right: 1.5rem;
  min-width: 232px;
`;

const Content = styled.div`
  max-width: 502px;
  flex: 1;
`;

function App() {
  useGate(TicketsGate);
  return (
    <StyledApp>
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
          <Tickets />
        </Content>
      </Main>
    </StyledApp>
  );
}

export default App;
