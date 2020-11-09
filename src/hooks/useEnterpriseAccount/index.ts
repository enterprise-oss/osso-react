import { ApolloError, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { EnterpriseAccount } from './index.types';

export const ACCOUNT_QUERY = gql`
  query EnterpriseAccount($domain: String!) {
    enterpriseAccount(domain: $domain) {
      id
      domain
      name
      status
      identityProviders {
        id
        domain
        service
        acsUrl
        acsUrlValidator
        ssoUrl
        ssoIssuer
        status
      }
      usersCount
      createdAt
      updatedAt
    }
  }
`;

export type UseEnterpriseAccountReturnTuple = {
  data: { enterpriseAccount?: EnterpriseAccount };
  loading: boolean;
  error?: ApolloError;
};

const useEnterpriseAccount = (domain: string): UseEnterpriseAccountReturnTuple => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccounts must be used inside an OssoProvider');
  }
  const { data, loading, error } = useQuery(ACCOUNT_QUERY, { client, variables: { domain } });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccount;
