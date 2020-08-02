import './index.css';
import 'antd/dist/antd.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { OssoProvider } from '@enterprise-oss/osso';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const client = new ApolloClient({
  uri: 'https://9694d35c2bc56bdcb8a2790fa9069dfb.m.pipedream.net',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <OssoProvider client={{ cors: 'no-cors', uri: 'https://example.com' }}>
        <App />
      </OssoProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
