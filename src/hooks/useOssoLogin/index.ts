import { ApolloError, gql, useLazyQuery } from '@apollo/client';
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
        status
      }
    }
  }
`;

export type UseOssoLoginReturnTuple = {
  providerExists: (domain: string) => void;
  data: { enterpriseAccount?: EnterpriseAccount };
  called: boolean;
  loading: boolean;
  error?: ApolloError;
};

const useOssoLogin = (): UseOssoLoginReturnTuple => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useOssoLogin must be used inside an OssoProvider');
  }
  const [providerExists, { called, loading, data }] = useLazyQuery(ACCOUNT_QUERY, { client });

  return {
    providerExists: (domain: string) => providerExists({ variables: { domain } }),
    called,
    data,
    loading,
  };
};

export default useOssoLogin;
