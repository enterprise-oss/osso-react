import { ApolloError, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import OssoContext from '~/client';
import { ADMIN_USERS_QUERY } from '~hooks/useAdminUsers';

import { AdminUsersData } from './index.types';

const INVITE_ADMIN_USER = gql`
  mutation InviteAdminUser($input: InviteAdminUserInput!) {
    inviteAdminUser(input: $input) {
      adminUser {
        id
        email
      }
    }
  }
`;

const inviteAdminUser = (): {
  inviteUser: (args: { email: string; role: string; oauthClientId?: string }) => Promise<any>;
  data?: AdminUsersData;
  loading: boolean;
  error?: ApolloError;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('inivteAdminUser must be used inside an OssoProvider');
  }

  const [inviteUser, { data, loading, error }] = useMutation(INVITE_ADMIN_USER, {
    client,
    update(
      cache,
      {
        data: {
          inviteAdminUser: { adminUser },
        },
      },
    ) {
      const data: AdminUsersData = cache.readQuery({
        query: ADMIN_USERS_QUERY,
      }) ?? { adminUsers: [] };

      if (!data.adminUsers) return;

      cache.writeQuery({
        query: ADMIN_USERS_QUERY,
        data: {
          adminUsers: [...data.adminUsers, adminUser],
        },
      });
    },
  });

  return {
    inviteUser: ({ email, role, oauthClientId }: { email: string; role: string; oauthClientId?: string }) =>
      inviteUser({ variables: { input: { email, role, oauthClientId } } }),
    data,
    loading,
    error,
  };
};

export default inviteAdminUser;
