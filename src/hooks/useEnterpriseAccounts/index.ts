import { ApolloError, ApolloQueryResult, FetchMoreQueryOptions, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { EnterpriseAccountData } from './index.types';

export const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts($first: Int!, $after: String, $sortColumn: String, $sortOrder: String) {
    enterpriseAccounts(first: $first, after: $after, sortColumn: $sortColumn, sortOrder: $sortOrder) {
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
          usersCount
        }
      }
    }
  }
`;

type Variables = {
  first: number;
  after?: string;
  sortOrder?: 'ascend' | 'descend';
  sortColumn?: string;
};

const useEnterpriseAccounts = (
  { limit } = { limit: 10 },
): {
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
  fetchMore: (options: FetchMoreQueryOptions<Variables, keyof Variables>) => void;
  refetch: (variables?: Partial<Variables>) => Promise<ApolloQueryResult<EnterpriseAccountData>>;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }

  const { data, loading, error, refetch, fetchMore } = useQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
      after: undefined,
      sortOrder: 'ascend',
      sortColumn: 'name',
    } as Variables,
  });

  return {
    data,
    loading,
    error,
    fetchMore,
    refetch,
  };
};

export default useEnterpriseAccounts;
