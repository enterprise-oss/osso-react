import { ApolloError, FetchMoreQueryOptions, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~client';

import { EnterpriseAccountData } from './index.types';

export const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts($first: Int!, $after: String) {
    enterpriseAccounts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        node {
          domain
          id
          identityProviders {
            id
            service
            domain
            acsUrl
            ssoCert
            ssoUrl
            status
          }
          name
          status
        }
      }
    }
  }
`;

type Variables = {
  first: number;
  after?: string;
};

const useEnterpriseAccounts = (
  { limit } = { limit: 10 },
): {
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
  fetchMore: (options: FetchMoreQueryOptions<Variables, keyof Variables>) => void;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('createEnterpriseAccount must be used inside an OssoProvider');
  }

  const { data, loading, error, fetchMore } = useQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
      after: null,
    },
  });

  return {
    data,
    loading,
    error,
    fetchMore,
  };
};

export default useEnterpriseAccounts;
