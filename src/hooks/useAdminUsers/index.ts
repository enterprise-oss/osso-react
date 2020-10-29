import { ApolloError, gql, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { AdminUsersData } from './index.types';

export const ADMIN_USERS_QUERY = gql`
  query AdminUsers {
    adminUsers {
      id
      email
      role
      createdAt
      updatedAt
    }
  }
`;

const useAdminUsers = (): {
  data: AdminUsersData | null;
  loading: boolean;
  error?: ApolloError | string;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useAdminUsers must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(ADMIN_USERS_QUERY, {
    client,
  });

  return {
    data,
    loading,
    error,
  };
};

export default useAdminUsers;
