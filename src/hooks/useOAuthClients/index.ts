import { ApolloError, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~/client';

import { OAuthClientsData } from './index.types';

export const OAUTH_CLIENTS_QUERY = gql`
  query OAuthClients {
    oauthClients {
      id
      name
      clientId
      clientSecret
      createdAt
      updatedAt
    }
  }
`;

const useOAuthClients = (): {
  data: OAuthClientsData | null;
  loading: boolean;
  error?: ApolloError | string;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useOAuthClients must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(OAUTH_CLIENTS_QUERY, {
    client,
  });

  return {
    data,
    loading,
    error,
  };
};

export default useOAuthClients;
