import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import OssoContext from '../../apollo';
import { Providers } from '../useOssoFields/index.types';
import { ACCOUNT_QUERY } from '../useEnterpriseAccount/index';
import { EnterpriseAccount } from '../useEnterpriseAccounts/index.types';

const CREATE_PROVIDER = gql`
  mutation CreateIdentityProvider($enterpriseAccountId: ID!, $providerService: IdentityProviderService!) {
    createIdentityProvider(input: { enterpriseAccountId: $enterpriseAccountId, providerService: $providerService }) {
      identityProvider {
        id
        domain
        enterpriseAccountId
        service
        acsUrl
      }
    }
  }
`;

const useIdentityProvider = (): {
  createProvider: (enterpriseAccountId: string, providerService: Providers) => void;
  data: any | any[];
  loading: boolean;
  error?: ApolloError;
} => {
  const client = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useProvider must be used inside an OssoProvider');
  }

  const [createProvider, { data, loading, error }] = useMutation(CREATE_PROVIDER, {
    client,
    update(
      cache,
      {
        data: {
          createIdentityProvider: { identityProvider },
        },
      },
    ) {
      const data = cache.readQuery({
        query: ACCOUNT_QUERY,
        variables: { domain: identityProvider.domain },
      });

      const enterpriseAccount: EnterpriseAccount | null = (data as any).enterpriseAccount;

      if (!enterpriseAccount) return;

      cache.writeQuery({
        query: ACCOUNT_QUERY,
        variables: { domain: identityProvider.domain },
        data: {
          enterpriseAccount: {
            ...enterpriseAccount,
            identityProviders: [...enterpriseAccount.identityProviders, identityProvider],
          },
        },
      });
    },
  });

  return {
    createProvider: (enterpriseAccountId: string, providerService: Providers) =>
      createProvider({ variables: { enterpriseAccountId, providerService } }),
    data,
    loading,
    error,
  };
};

export default useIdentityProvider;
