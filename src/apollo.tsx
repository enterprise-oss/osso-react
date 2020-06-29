import React, { createContext, ReactElement } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.OSSO_BASE_URL}/graphql`,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const OssoContext = createContext(client);

type OssoProviderProps = {
  children: ReactElement;
};

const OssoProvider = ({ children }: OssoProviderProps): ReactElement => (
  <OssoContext.Provider value={client}>{children} </OssoContext.Provider>
);

export default OssoContext;
export { OssoProvider, client };
