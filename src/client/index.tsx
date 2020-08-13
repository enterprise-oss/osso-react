import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import React, { createContext, ReactElement } from 'react';

import { OssoClientOptions, OssoContextValue, OssoProviderProps } from './index.types';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        enterpriseAccounts: relayStylePagination(),
        oauthClients: {
          merge(_existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
  },
});

let link: ApolloLink;

const buildClient = (clientOptions?: OssoClientOptions) => {
  const uri = clientOptions?.uri || '/graphql';

  link = new HttpLink({
    uri,
    credentials: clientOptions?.cors || 'same-origin',
  });

  return new ApolloClient({
    cache,
    link,
    name: 'osso',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  });
};

const defaultValue: OssoContextValue = {
  client: undefined,
};

const OssoContext = createContext(defaultValue);

const OssoProvider = ({ children, client: clientOptions }: OssoProviderProps): ReactElement => {
  const client = buildClient(clientOptions);

  return <OssoContext.Provider value={{ client }}>{children}</OssoContext.Provider>;
};

export default OssoContext;
export { OssoProvider };
