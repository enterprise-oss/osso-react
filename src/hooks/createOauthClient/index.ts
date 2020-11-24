import { ApolloError, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~/client';
import { OAUTH_CLIENTS_QUERY } from '~hooks/useOAuthClients/index';

import { OAuthClientsData } from './index.types';

const CREATE_OAUTH_CLIENT = gql`
  mutation CreateOauthClient($input: CreateOauthClientInput!) {
    createOauthClient(input: $input) {
      oauthClient {
        id
        name
      }
    }
  }
`;

const createOauthClient = (): {
  createClient: (name: string) => Promise<any>;
  data?: OAuthClientsData;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }

  const [createClient, { data, loading, error }] = useMutation(CREATE_OAUTH_CLIENT, {
    client,
    update(
      cache,
      {
        data: {
          createOauthClient: { oauthClient },
        },
      },
    ) {
      const data: OAuthClientsData = cache.readQuery({
        query: OAUTH_CLIENTS_QUERY,
      }) ?? { oauthClients: [] };

      if (!data.oauthClients) return;

      cache.writeQuery({
        query: OAUTH_CLIENTS_QUERY,
        data: {
          oauthClients: [...data.oauthClients, oauthClient],
        },
      });
    },
  });

  return {
    createClient: (name: string) => createClient({ variables: { input: { name } } }),
    data,
    loading,
    error,
  };
};

export default createOauthClient;
