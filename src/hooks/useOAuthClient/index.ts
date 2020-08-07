import { ApolloError, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { OauthClient } from './index.types';

const OAUTH_CLIENT_QUERY = gql`
  query OAuthClient($id: ID!) {
    oauthClient(id: $id) {
      id
      name
      clientId
      clientSecret
      redirectUris {
        id
        uri
        primary
      }
      createdAt
      updatedAt
    }
  }
`;

const useOAuthClient = (
  id: string,
): {
  data: { oauthClient: OauthClient };
  loading: boolean;
  error?: ApolloError | string;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useOAuthClient must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(OAUTH_CLIENT_QUERY, {
    client,
    variables: {
      id,
    },
  });

  return {
    data,
    loading,
    error,
  };
};

export default useOAuthClient;
