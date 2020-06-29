import OssoContext from '../../apollo';
import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { EnterpriseAccount } from '../useEnterpriseAccounts/index.types';

export const ACCOUNT_QUERY = gql`
  query EnterpriseAccount($domain: String!) {
    enterpriseAccount(domain: $domain) {
      id
      domain
      name
      status
      identityProviders {
        id
        service
        acsUrl
      }
    }
  }
`;

const useEnterpriseAccount = (
  domain: string,
): {
  data: { enterpriseAccount?: EnterpriseAccount };
  loading: boolean;
  error?: ApolloError;
} => {
  const client = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useEnterpriseAccount must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(ACCOUNT_QUERY, {
    client,
    variables: { domain },
  });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccount;
