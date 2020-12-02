import { ApolloError, FetchResult, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~client';
import { ACCOUNT_QUERY } from '~hooks/useEnterpriseAccount/index';
import { CreateIdentityProviderData } from '~types';

import { EnterpriseAccount, Providers } from './index.types';

const CREATE_PROVIDER = gql`
  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {
    createIdentityProvider(input: $input) {
      identityProvider {
        id
        domain
        enterpriseAccountId
        service
        ssoIssuer
        acsUrl
      }
    }
  }
`;

const createIdentityProvider = (): {
  createProvider: ({
    enterpriseAccountId,
    oauthClientId,
    service,
  }: {
    enterpriseAccountId?: string;
    oauthClientId?: string;
    service: Providers;
  }) => Promise<FetchResult>;
  data?: CreateIdentityProviderData;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('createIdentityProvider must be used inside an OssoProvider');
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
      const data: { enterpriseAccount: EnterpriseAccount } | null = cache.readQuery({
        query: ACCOUNT_QUERY,
        variables: { domain: identityProvider.domain },
      });

      const enterpriseAccount = data?.enterpriseAccount;

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
    createProvider: ({
      enterpriseAccountId,
      oauthClientId,
      service,
    }: {
      enterpriseAccountId?: string;
      oauthClientId?: string;
      service: Providers;
    }) => createProvider({ variables: { input: { enterpriseAccountId, oauthClientId, service } } }),
    data,
    loading,
    error,
  };
};

export default createIdentityProvider;
