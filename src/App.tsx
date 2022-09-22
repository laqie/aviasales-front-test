import { globalStyles } from './styles/global';
import Logo from './components/Logo';


function App() {
  globalStyles();
  return (
    <div>
      App
      <Logo />
    </div>
  );
}

export default App;
