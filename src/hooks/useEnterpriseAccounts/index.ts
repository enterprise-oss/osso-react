import { ApolloError, ApolloQueryResult, gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useContext, useEffect } from 'react';

import OssoContext from '~client';

import { EnterpriseAccountData } from './index.types';

export const ACCOUNTS_QUERY = gql`
  query EnterpriseAccounts($first: Int) {
    enterpriseAccounts(first: $first) {
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

const useEnterpriseAccounts = (
  { limit } = { limit: 10 },
): {
  data: EnterpriseAccountData | null;
  loading: boolean;
  error?: ApolloError | string;
  fetchMore: any;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('createEnterpriseAccount must be used inside an OssoProvider');
  }

  const { data, loading, error, fetchMore } = useQuery(ACCOUNTS_QUERY, {
    client,
    variables: {
      first: limit,
    },
  });

  return {
    data,
    loading,
    error,
    fetchMore,
  };
};

export default useEnterpriseAccounts;
