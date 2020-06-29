import OssoContext from '../../apollo';
import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

const PROVIDER_QUERY = gql`
  query IdentityProvider($id: ID!) {
    identityProvider: samlProvider(id: $id) {
      id
      provider
    }
  }
`;

const SET_PROVIDER = gql`
  mutation SetProvider($id: ID!, $provider: IdentityProvider!) {
    setSamlProvider(input: { id: $id, provider: $provider }) {
      identityProvider: samlProvider {
        id
        provider
      }
    }
  }
`;

const useProvider = (
  providerId: string,
): {
  data: any | any[];
  loading: boolean;
  error?: ApolloError;
} => {
  const client = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useProvider must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(PROVIDER_QUERY, {
    variables: { providerId },
  });

  // const setProviderService = (id: string, provider: Providers) => {
  //   client.mutate({
  //     mutation: SET_PROVIDER,
  //     variables: {
  //       id,
  //       provider,
  //     },
  //   });
  // };

  return {
    data,
    loading,
    error,
  };
};

export default useProvider;
