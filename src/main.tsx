import React from 'react';
import ReactDOM from 'react-dom/client';
import './models/init';
import App from './App';


const rootElement = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM
  .createRoot(rootElement)
  .render(app);
