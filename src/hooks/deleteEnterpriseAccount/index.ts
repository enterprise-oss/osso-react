import { ApolloError, FetchResult, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~client';
import { ACCOUNTS_QUERY } from '~hooks/useEnterpriseAccounts/index';

import { EnterpriseAccount } from './index.types';

const DELETE_ACCOUNT = gql`
  mutation DeleteEnterpriseAccount($input: DeleteEnterpriseAccountInput!) {
    deleteEnterpriseAccount(input: $input) {
      enterpriseAccount {
        id
      }
    }
  }
`;

const deleteEnterpriseAccount = (): {
  deleteAccount: (id: string) => Promise<FetchResult>;
  data?: EnterpriseAccount;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);
  let deleteId: string;

  if (client === undefined) {
    throw new Error('deleteEnterpriseAccount must be used inside an OssoProvider');
  }

  const [deleteAccount, { data, loading, error }] = useMutation(DELETE_ACCOUNT, {
    client,
    update(cache) {
      const data: { enterpriseAccounts: EnterpriseAccount[] } | null = cache.readQuery({
        query: ACCOUNTS_QUERY,
      });

      cache.evict({
        fieldName: 'enterpriseAccounts',
        broadcast: false,
      });

      const remainingAccounts = data?.enterpriseAccounts.filter((account) => account.id !== deleteId) || [];

      cache.writeQuery({
        query: ACCOUNTS_QUERY,
        data: {
          enterpriseAccounts: remainingAccounts,
        },
      });
    },
  });

  const cacheDeleteAccount = (id: string) => {
    deleteId = id;
    return deleteAccount({ variables: { input: { id } } });
  };

  return {
    deleteAccount: (id: string) => cacheDeleteAccount(id),
    data,
    loading,
    error,
  };
};

export default deleteEnterpriseAccount;
