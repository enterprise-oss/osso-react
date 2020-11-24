import { ApolloError, ApolloQueryResult, FetchMoreQueryOptions, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~/client';

import { EnterpriseAccountData } from './index.types';

export const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts($first: Int!, $after: String, $sortColumn: String, $sortOrder: String, $search: String) {
    enterpriseAccounts(first: $first, after: $after, sortColumn: $sortColumn, sortOrder: $sortOrder, search: $search) {
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
  search?: string;
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

  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
      after: undefined,
      sortOrder: 'ascend',
      sortColumn: 'name',
      search: undefined,
    } as Variables,
    notifyOnNetworkStatusChange: true,
  });

  return {
    data,
    loading: loading || networkStatus === 3,
    error,
    fetchMore,
    refetch,
  };
};

export default useEnterpriseAccounts;
