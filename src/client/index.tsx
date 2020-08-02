import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import React, { createContext, ReactElement } from 'react';

import { OssoClientOptions, OssoContextValue, OssoProviderProps } from './index.types';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        enterpriseAccounts: relayStylePagination(),
      },
    },
  },
});
let link: ApolloLink;
let client: ApolloClient<NormalizedCacheObject>;

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
    },
  });
};

const defaultValue: OssoContextValue = {
  client: undefined,
};

const OssoContext = createContext(defaultValue);

const OssoProvider = ({ children, client: clientOptions }: OssoProviderProps): ReactElement => {
  const client = buildClient(clientOptions);

  return (
    <ApolloProvider key="osso" client={client}>
      {children}
    </ApolloProvider>
  );
};

export default OssoContext;
export { OssoProvider, client };
