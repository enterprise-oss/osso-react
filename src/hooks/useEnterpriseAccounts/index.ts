import { ApolloError, gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useContext, useEffect } from 'react';

import OssoContext from '~client';

import { EnterpriseAccountData } from './index.types';

export const ACCOUNTS_QUERY = gql`
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
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('createEnterpriseAccount must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(ACCOUNTS_QUERY, { client });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccounts;
