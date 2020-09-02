import { ApolloError, FetchResult, gql, MutationResult, useMutation } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~client';

import { IdentityProvider, IdentityProviderFormState } from './index.types';

const CONFIGURE_PROVIDER = gql`
  mutation ConfigureIdentityProvider($id: ID!, $service: IdentityProviderService, $ssoUrl: String!, $ssoCert: String!) {
    configureIdentityProvider(id: $id, service: $service, ssoUrl: $ssoUrl, ssoCert: $ssoCert) {
      identityProvider {
        id
        domain
        enterpriseAccountId
        service
        acsUrl
        ssoCert
        ssoUrl
        status
      }
    }
  }
`;

const configureIdentityProvider = (): {
  configureProvider: (id: string, providerData: IdentityProviderFormState) => Promise<FetchResult>;
  data?: IdentityProvider;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('configureIdentityProvider must be used inside an OssoProvider');
  }

  const [configureProvider, { data, loading, error }] = useMutation(CONFIGURE_PROVIDER, {
    client,
  });

  return {
    configureProvider: (id, configData) => configureProvider({ variables: { id, ...configData } }),
    data,
    loading,
    error,
  };
};

export default configureIdentityProvider;
