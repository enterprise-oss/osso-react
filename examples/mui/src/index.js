import './index.css';

import { OssoProvider } from '@enterprise-oss/osso';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <OssoProvider client={{ cors: 'same-origin', uri: 'https://example.com' }}>
      <App />
    </OssoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
