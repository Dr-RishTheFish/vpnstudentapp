import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { VpnProvider } from './contexts/VpnContext';

ReactDOM.render(
  <React.StrictMode>
    <VpnProvider>
      <App />
    </VpnProvider>
  </React.StrictMode>,
  document.getElementById('root')
);