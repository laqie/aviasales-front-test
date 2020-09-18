import React from 'react';
import { useGate } from 'effector-react';
import { TicketsGate } from './models/tickets';
import Tickets from './components/TIckets';
import Ordering from './components/Ordering';
import Filters from './components/Filters';

import styled from 'styled-components';

import LogoShadowFile from './assets/Logo.svg';


const StyledApp = styled.div`
  width: 960px;
`

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
  margin: 1rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const Aside = styled.aside`

`

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
        <div>
          <Ordering />
          <Tickets />
        </div>
      </Main>
    </StyledApp>
  );
}

export default App;
