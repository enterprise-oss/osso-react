import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import OssoContext from '../../apollo';

const PROVIDER_QUERY = gql`
  query IdentityProvider($id: ID!) {
    identityProvider(id: $id) {
      id
      service
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

  return {
    data,
    loading,
    error,
  };
};

export default useProvider;
