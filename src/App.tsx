import { createTheme, styled, theme } from './stitches.config';
import { globalStyles } from './styles/global';
import Logo from './components/Logo';
import Filters from './components/Filters';
import { useEffect } from 'react';
import { appMounted$ } from './models/app';
import Ordering from './components/Ordering';
import TicketsList from './components/TicketsList';


function App() {
  globalStyles();
  useEffect(appMounted$.trigger, []);
  return (
    <Container className={theme}>
      <Header>
        <a href="/"><Logo /></a>
      </Header>
      <Sidebar>
        <Filters />
      </Sidebar>
      <Main>
        <Ordering />
        <TicketsList />
      </Main>
      <Footer>
        &copy;&nbsp;2022
      </Footer>
    </Container>
  );
}

const Container = styled('div', {
  display: 'grid',
  color: '$gray500',
  backgroundColor: '$blue100',
  minHeight: '100vh',
  minWidth: 320,
  gridColumnGap: '$lg',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '$header auto 1fr $footer',
  gridTemplateAreas: `
    "header"
    "sidebar"
    "main"
    "footer";
  `,
  '@md': {
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: '$header 1fr $footer',
    gridTemplateAreas: `
      "header header"
      "sidebar main"
      "footer footer";
    `,
  },
});

const Header = styled('header', {
  gridArea: 'header',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
});

const Sidebar = styled('aside', {
  gridArea: 'sidebar',
  minWidth: '232px',
  maxWidth: '502px',
  width: '100%',
  justifySelf: 'center',
  mb: '$lg',
  '@md': {
    width: '232px',
    justifySelf: 'end',
    mb: 0,
  },

});

const Main = styled('main', {
  gridArea: 'main',
  maxWidth: '502px',
  width: '100%',
  justifySelf: 'center',


  display: 'grid',
  rowGap: '$lg',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr',
  '@md': {
    width: '502px',
    justifySelf: 'start',
  },
});

const Footer = styled('footer', {
  gridArea: 'footer',
  textAlign: 'center',
  color: '$gray200',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
});


export default App;
