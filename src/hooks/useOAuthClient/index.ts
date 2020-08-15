import { ApolloError, FetchResult, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';
import { OAUTH_CLIENTS_QUERY } from '~/hooks/useOAuthClients';
import { RedirectUri } from '~types';

import {
  DELETE_OAUTH_CLIENT_MUTATION,
  OAUTH_CLIENT_QUERY,
  REGENERATE_CREDENTIALS_MUTATION,
  SET_REDIRECT_URIS,
} from './graphql';
import { OauthClient, OAuthClientsData } from './index.types';

const useOAuthClient = (
  id: string,
): {
  data: { oauthClient: OauthClient };
  loading: boolean;
  error?: ApolloError | string;
  regenerateCredentials: () => Promise<FetchResult<string, Record<string, string>, Record<string, string>>>;
  deleteClient: () => Promise<any>;
  setRedirectUris: (redirectUris: RedirectUri[]) => Promise<any>;
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

  const [setRedirectUris] = useMutation(SET_REDIRECT_URIS, { client });

  const [deleteClient] = useMutation(DELETE_OAUTH_CLIENT_MUTATION, {
    client,
    variables: { input: { id } },
    update(cache) {
      const data: OAuthClientsData = cache.readQuery({
        query: OAUTH_CLIENTS_QUERY,
      }) ?? { oauthClients: [] };

      cache.writeQuery({
        query: OAUTH_CLIENTS_QUERY,
        data: {
          oauthClients: [...data.oauthClients.filter((client: OauthClient) => client.id !== id)],
        },
      });
    },
  });

  return {
    data,
    loading,
    error,
    regenerateCredentials,
    deleteClient,
    setRedirectUris: (redirectUris: RedirectUri[]) => setRedirectUris({ variables: { input: { id, redirectUris } } }),
  };
};

export default useOAuthClient;
