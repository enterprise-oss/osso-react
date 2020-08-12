import { ApolloError, gql, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { OauthClient } from './index.types';

const ADD_REDIRECT_URIS = gql`
  mutation AddRedirectUrisToOauthClient($input: AddRedirectUrisToOauthClientInput!) {
    oauthClient: addRedirectUrisToOauthClient(input: $input) {
      oauthClient {
        id
        redirectUris {
          id
          uri
          primary
        }
        updatedAt
      }
    }
  }
`;

const addRedirectUris = (): {
  addUris: (uris: string[], oauthClientId: string) => void;
  data: { oauthClient: OauthClient };
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('addRedirectUris must be used inside an OssoProvider');
  }

  const [addUris, { data, loading, error }] = useMutation(ADD_REDIRECT_URIS, {
    client,
  });

  return {
    addUris: (uris: string[], oauthClientId: string) => {
      addUris({ variables: { input: { uris, oauthClientId } } });
    },
    data,
    loading,
    error,
  };
};

export default addRedirectUris;
