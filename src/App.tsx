import { useEffect } from 'react';
import { styled } from './stitches.config';
import { globalStyles } from './styles/global';
import { appMounted$ } from './models/app';
import Logo from './components/Logo';
import Filters from './components/Filters';
import Ordering from './components/Ordering';
import TicketsList from './components/TicketsList';
import ThemeToggleButton from './components/ThemeToggleButton';


function App() {
  useEffect(appMounted$.trigger, []);
  globalStyles();

  return (
    <Container>
      <Header>
        <a href="/" aria-label="Logo"><Logo /></a>
      </Header>
      <Sidebar>
        <Filters />
      </Sidebar>
      <Main>
        <Ordering />
        <TicketsList />
      </Main>
      <Footer>
        <ThemeToggleButton />
      </Footer>
    </Container>
  );
}

const Container = styled('div', {
  display: 'grid',
  minWidth: 320,
  height: '100vh',
  px: '$sm',
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
    px: 0,
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
  color: '$textMuted',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
});


export default App;
