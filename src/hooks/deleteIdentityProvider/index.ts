import { FetchResult, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~client';

const DELETE_PROVIDER_MUTATION = gql`
  mutation DeleteIdentityProvider($input: DeleteIdentityProviderInput!) {
    deleteIdentityProvider(input: $input) {
      identityProvider {
        id
      }
    }
  }
`;

const deleteIdentityProvider = (
  id: string,
): {
  deleteProvider: () => Promise<FetchResult>;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('deleteEnterpriseAccount must be used inside an OssoProvider');
  }

  const [deleteProvider] = useMutation(DELETE_PROVIDER_MUTATION, {
    client,
    variables: { input: { id } },
    update(cache) {
      cache.evict({ id: cache.identify({ __typename: 'IdentityProvider', id }) });
    },
  });

  return {
    deleteProvider,
  };
};

export default deleteIdentityProvider;
