import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  gql,
  InMemoryCache,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useContext, useEffect } from 'react';

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
        }
      }
    }
  }
`;

type Variables = {
  first: number;
  after?: string;
  sortOrder?: string;
  sortColumn?: string;
};

const useEnterpriseAccounts = (
  { limit } = { limit: 10 },
): {
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
  fetchMore: any; //(options: FetchMoreQueryOptions<Variables, keyof Variables>) => void;
  refetch: ((variables?: Partial<Variables> | undefined) => Promise<ApolloQueryResult<any>>) | undefined; //(options: FetchMoreQueryOptions<Variables, keyof Variables>) => void; //(variables?: Partial<Variables>) => Promise<ApolloQueryResult<EnterpriseAccountData>>;
} => {
  let client: ApolloClient<unknown>;

  try {
    client = useApolloClient();
  } catch (error) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }

  const [query, { data, loading, error, refetch, fetchMore }] = useLazyQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
      after: undefined,
      sortOrder: 'desc',
      sortColumn: 'created_at',
    } as Variables,
  });

  useEffect(() => {
    query();
  }, []);

  return {
    data,
    loading,
    error,
    fetchMore,
    refetch,
  };
};

export default useEnterpriseAccounts;
