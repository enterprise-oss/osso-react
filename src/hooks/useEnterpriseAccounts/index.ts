import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import { useApolloClient } from '@apollo/client';

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

const throwNoProvider = () => {
  throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
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
  let client: ApolloClient<InMemoryCache>;

  try {
    client = useApolloClient() as ApolloClient<InMemoryCache>;
  } catch (error) {
    throwNoProvider();
  }

  const { data, loading, error, refetch, fetchMore } = useQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
      after: undefined,
      sortOrder: 'desc',
      sortColumn: 'created_at',
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
