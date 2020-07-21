import { ApolloError, gql } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import OssoContext from '~client';

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
        configured
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
  const { client } = useContext(OssoContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  if (client === undefined) {
    throw new Error('useEnterpriseAccount must be used inside an OssoProvider');
  }

  useEffect(() => {
    client
      ?.query({ query: ACCOUNT_QUERY, variables: { domain } })
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [client]);

  const observable = client.watchQuery({ query: ACCOUNT_QUERY, variables: { domain } });

  observable
    .result()
    .then((response) => {
      setData(response?.data);
      setLoading(false);
    })
    .catch((e) => {
      setError(e);
      setLoading(false);
    });

  return {
    data,
    loading,
    error,
  };
};

export default useEnterpriseAccount;
