import { useContext, useState } from 'react';

import OssoContext from '~/client';

export type UseOssoLoginReturnTuple = {
  providerExists: (domain: string) => Promise<boolean>;
  loading: boolean;
};

const useOssoLogin = (): UseOssoLoginReturnTuple => {
  const { baseUrl } = useContext(OssoContext);
  const [loading, setLoading] = useState(false);

  if (baseUrl === undefined) {
    throw new Error('useOssoLogin must be used inside an OssoProvider');
  }

  const providerExists = async (domain: string): Promise<boolean> => {
    setLoading(true);

    return fetch(`${baseUrl}/idp`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain,
      }),
    })
      .then((res) => res.json())
      .then(({ onboarded }) => {
        setLoading(onboarded);
        return Boolean(onboarded);
      });
  };

  return {
    providerExists: async (domain: string) => providerExists(domain),
    loading,
  };
};

export default useOssoLogin;
