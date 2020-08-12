import { ApolloError, gql, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~client';

import { RedirectUri } from './index.types';

const DELETE_ACCOUNT = gql`
  mutation DeleteRedirectUri($input: DeleteRedirectUriInput!) {
    oauthClient: deleteRedirectUri(input: $input) {
      oauthClient {
        id
        redirectUris {
          id
          uri
          primary
        }
      }
    }
  }
`;

const deleteRedirectUri = (): {
  deleteUri: (id: string) => void;
  data?: RedirectUri;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('deleteRedirectUri must be used inside an OssoProvider');
  }

  const [deleteUri, { data, loading, error }] = useMutation(DELETE_ACCOUNT, {
    client,
  });

  return {
    deleteUri: (id: string) => {
      deleteUri({ variables: { input: { id } } });
    },
    data,
    loading,
    error,
  };
};

export default deleteRedirectUri;
