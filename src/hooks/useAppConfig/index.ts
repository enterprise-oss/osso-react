import { ApolloError, FetchResult, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';

import OssoContext from '~/client';

import { APP_CONFIG_QUERY, UPDATE_APP_CONFIG_MUTATION } from './graphql';
import { AppConfig } from './index.types';

const useAppConfig = (): {
  data: { appConfig: AppConfig };
  loading: boolean;
  error?: ApolloError | string;
  update: (args: AppConfig) => Promise<FetchResult>;
} => {
  const { client } = useContext(OssoContext);

  if (client === undefined) {
    throw new Error('useAppConfig must be used inside an OssoProvider');
  }

  const { data, loading, error } = useQuery(APP_CONFIG_QUERY, {
    client,
  });

  const [update] = useMutation(UPDATE_APP_CONFIG_MUTATION, {
    client,
  });

  return {
    data,
    loading,
    error,
    update: (args: AppConfig) => update({ variables: { input: { ...args } } }),
  };
};

export default useAppConfig;
