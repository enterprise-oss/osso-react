import { ApolloError, gql, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~client';

import { RedirectUri } from './index.types';

const MARK_PRIMARY = gql`
  mutation MarkRedirectUriPrimary($input: MarkRedirectUriPrimaryInput!) {
    oauthClient: markRedirectUriPrimary(input: $input) {
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

const markRedirectUriPrimary = (): {
  markPrimary: (id: string) => void;
  data?: RedirectUri;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('markRedirectUriPrimary must be used inside an OssoProvider');
  }

  const [markPrimary, { data, loading, error }] = useMutation(MARK_PRIMARY, {
    client,
  });

  return {
    markPrimary: (id: string) => {
      markPrimary({ variables: { input: { id } } });
    },
    data,
    loading,
    error,
  };
};

export default markRedirectUriPrimary;
