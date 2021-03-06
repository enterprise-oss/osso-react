import { ApolloError, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~/client';

import { IdentityProvider } from './index.types';

const PROVIDER_QUERY = gql`
  query IdentityProvider($id: ID!) {
    identityProvider(id: $id) {
      id
      domain
      service
      acsUrl
      acsUrlValidator
      ssoCert
      ssoIssuer
      ssoUrl
      status
      oauthClient {
        id
        name
      }
    }
  }
`;

const useProvider = (
  id: string,
): {
  data?: { identityProvider: IdentityProvider };
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useIdentityProvider must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(PROVIDER_QUERY, {
    variables: { id },
    client,
  });

  return {
    data,
    loading,
    error,
  };
};

export default useProvider;
