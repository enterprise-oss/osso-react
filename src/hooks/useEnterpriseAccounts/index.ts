import OssoContext from '~/apollo';
import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { EnterpriseAccountData } from './index.types';

const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts {
    enterpriseAccounts {
      id
      domain
      name
      status
    }
  }
`;

const useEnterpriseAccounts = (): {
  data: EnterpriseAccountData;
  loading: boolean;
  error?: ApolloError;
} => {
  const client = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(ACCOUNTS_QUERY, { client });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccounts;
