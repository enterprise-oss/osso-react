import './index.css';
import 'antd/dist/antd.css';

import { OssoProvider } from '@enterprise-oss/osso';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router>
    <OssoProvider
      client={{
        baseUrl: 'http://localhost:9292/api',
        jwt:
          'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDY5MzUyNjksImlhdCI6MTYwNjkzMzQ2OSwibmJmIjoxNjA2OTMzNDY0LCJhY2NvdW50X2lkIjoiZThjMTU2YWItZmRkMi00NjRiLThlNTktYjkyMzZhYzhjM2UzIiwiYXV0aGVudGljYXRlZF9ieSI6WyJhcGkiXX0.IUsIXRFMOHVM9pOXJETssHUkHCkdKKKWvBlKuguOrXU',
      }}
    >
      <App />
    </OssoProvider>
  </Router>,
  document.getElementById('root'),
);
