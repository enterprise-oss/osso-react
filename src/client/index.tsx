import { ApolloClient, HttpLink, InMemoryCache, ServerError } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { relayStylePagination } from '@apollo/client/utilities';
import gql from 'graphql-tag';
import React, { createContext, ReactElement, useState } from 'react';

import { OssoClientOptions, OssoContextValue, OssoProviderProps, OssoUser } from './index.types';

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
    OauthClient: {
      fields: {
        redirectUris: {
          merge(_existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
  },
});

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
      scope
      oauthClientId
    }
  }
`;

const buildClient = (clientOptions?: OssoClientOptions) => {
  const uri = (clientOptions?.baseUrl ?? '') + '/graphql';

  const headers = {} as Record<string, string>;

  if (clientOptions?.jwt) {
    headers['Authorization'] = clientOptions?.jwt;
  }

  const link = new HttpLink({
    uri,
    credentials: clientOptions?.jwt ? undefined : 'include',
    headers,
  });

  const unauthorizedLink = onError(({ networkError }) => {
    if ((networkError as ServerError)?.statusCode === 401) {
      clientOptions?.onUnauthorized?.();
    }
  });

  const client = new ApolloClient({
    cache,
    link: unauthorizedLink.concat(link),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  });

  return client;
};

const defaultValue: OssoContextValue = {
  client: undefined,
  baseUrl: undefined,
};

const OssoContext = createContext(defaultValue);

const OssoProvider = ({ children, client: clientOptions }: OssoProviderProps): ReactElement => {
  const [currentUser, setCurrentUser] = useState<OssoUser>();
  const client = buildClient(clientOptions);
  client
    .query({ query: CURRENT_USER_QUERY })
    .then(({ data }) => {
      setCurrentUser(data.currentUser);
    })
    .catch((err) => {
      throw err;
    });

  return (
    <OssoContext.Provider value={{ client, currentUser, baseUrl: clientOptions?.baseUrl }}>
      {children}
    </OssoContext.Provider>
  );
};

export default OssoContext;
export { OssoProvider };
