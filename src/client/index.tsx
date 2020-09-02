import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import React, { createContext, ReactElement, useState } from 'react';

import { OauthClient, RedirectUri } from '~types';

import { OssoClientOptions, OssoContextValue, OssoProviderProps, OssoUser } from './index.types';

const buildCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          enterpriseAccounts: relayStylePagination(),
          oauthClients: {
            merge(_existing = [], incoming: OauthClient[]) {
              return incoming;
            },
          },
        },
      },
      OauthClient: {
        fields: {
          redirectUris: {
            merge(_existing = [], incoming: RedirectUri[]) {
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

let link: ApolloLink;

const buildClient = (clientOptions?: OssoClientOptions) => {
  const uri = clientOptions?.uri || '/graphql';

  link = new HttpLink({
    uri,
    credentials: clientOptions?.cors || 'same-origin',
  });

  const client = new ApolloClient({
    cache: buildCache(),
    link,
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

  return <OssoContext.Provider value={{ client, currentUser }}>{children}</OssoContext.Provider>;
};

export default OssoContext;
export { OssoProvider };
