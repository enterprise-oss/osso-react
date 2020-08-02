import { ApolloClient, ApolloError, gql, useApolloClient, useMutation } from '@apollo/client';

import { ACCOUNTS_QUERY } from '~hooks/useEnterpriseAccounts/index';

import { EnterpriseAccountData } from './index.types';

const CREATE_ACCOUNT = gql`
  mutation CreateEnterpriseAccount($input: CreateEnterpriseAccountInput!) {
    createEnterpriseAccount(input: $input) {
      enterpriseAccount {
        id
        domain
        name
        status
      }
    }
  }
`;

const createEnterpriseAccount = (): {
  createAccount: (name: string, domain: string) => void;
  data?: EnterpriseAccountData;
  loading: boolean;
  error?: ApolloError;
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let client: ApolloClient<any>;
  try {
    client = useApolloClient();
  } catch (error) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }

  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT, {
    client,
    update(
      cache,
      {
        data: {
          createEnterpriseAccount: { enterpriseAccount },
        },
      },
    ) {
      const data: EnterpriseAccountData | null = cache.readQuery({
        query: ACCOUNTS_QUERY,
      });

      const existing = data?.enterpriseAccounts || {
        totalCount: 0,
        edges: [],
      };

      const newEdge = {
        __typename: 'EnterpriseAccountEdge',
        node: enterpriseAccount,
      };

      cache.writeQuery({
        query: ACCOUNTS_QUERY,
        data: {
          enterpriseAccounts: {
            ...existing,
            totalCount: enterpriseAccount.totalCount + 1,
            edges: [...existing.edges, newEdge],
          },
        },
      });
    },
  });

  return {
    createAccount: (name: string, domain: string) => {
      createAccount({ variables: { input: { name, domain } } });
    },
    data,
    loading,
    error,
  };
};

export default createEnterpriseAccount;
