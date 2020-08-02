import { ApolloClient, ApolloError, gql, useApolloClient, useQuery } from '@apollo/client';

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
        service
        acsUrl
        ssoUrl
        status
        documentationPdfUrl
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
  let client: ApolloClient<unknown>;
  try {
    client = useApolloClient();
  } catch (error) {
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
