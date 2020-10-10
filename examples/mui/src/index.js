import './index.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router>
    <CssBaseline />
    <App />
  </Router>,
  document.getElementById('root'),
);
