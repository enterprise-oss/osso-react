import { ApolloError, FetchResult, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { DELETE_OAUTH_CLIENT_MUTATION, OAUTH_CLIENT_QUERY, REGENERATE_CREDENTIALS_MUTATION } from './graphql';
import { OauthClient } from './index.types';

const useOAuthClient = (
  id: string,
): {
  data: { oauthClient: OauthClient };
  loading: boolean;
  error?: ApolloError | string;
  regenerateCredentials: () => Promise<FetchResult<string, Record<string, string>, Record<string, string>>>;
  deleteClient: () => Promise<any>;
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

  const [regenerateCredentials] = useMutation(REGENERATE_CREDENTIALS_MUTATION, {
    client,
    variables: { input: { id } },
  });

  const [deleteClient] = useMutation(DELETE_OAUTH_CLIENT_MUTATION, {
    client,
    variables: { input: { id } },
  });

  return {
    data,
    loading,
    error,
    regenerateCredentials,
    deleteClient,
  };
};

export default useOAuthClient;
