import { ApolloError, FetchResult, gql, useMutation, useQuery } from '@apollo/client';
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
      ssoCert
      ssoUrl
      status
    }
  }
`;

const DELETE_PROVIDER_MUTATION = gql`
  mutation DeleteIdentityProvider($input: DeleteIdentityProviderInput!) {
    deleteIdentityProvider(input: $input) {
      identityProvider {
        id
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
  deleteProvider: () => Promise<FetchResult>;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useIdentityProvider must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(PROVIDER_QUERY, {
    variables: { id },
    client,
  });

  const [deleteProvider] = useMutation(DELETE_PROVIDER_MUTATION, {
    client,
    variables: { input: { id } },
    update(cache) {
      cache.evict({ id: cache.identify({ __typename: 'IdentityProvider', id }) });
    },
  });

  return {
    data,
    loading,
    error,
    deleteProvider,
  };
};

export default useProvider;
