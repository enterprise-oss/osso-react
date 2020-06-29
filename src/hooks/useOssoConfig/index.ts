import { useState, useEffect } from 'react';
import { OssoProviderDetails, ProviderMap, Providers } from './index.types';

const providers: ProviderMap<Providers> = {
  [Providers.Azure]: {
    value: Providers.Azure,
    label: 'Azure',
    ossoGeneratedFields: [
      {
        name: 'acsUrl',
        inputProps: {
          label: 'Reply URL (Assertion Consumer Service URL)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          label: 'Identifier (Entity ID)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
    idpGeneratedFields: [],
    serviceProviderMetadata: false,
    idpMetadata: true,
  },

  [Providers.Okta]: {
    value: Providers.Okta,
    label: 'Okta',
    ossoGeneratedFields: [
      {
        name: 'acsUrl',
        inputProps: {
          label: 'Single Sign On URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          label: 'SP Audience ID',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
    serviceProviderMetadata: false,
    idpGeneratedFields: [],
    idpMetadata: true,
  },
};

const useOssoFields = (
  initialProvider: Providers,
): {
  provider?: Providers;
  setProvider: (provider: Providers) => void;
  providers: ProviderMap<Providers>;
  providerDetails?: OssoProviderDetails;
} => {
  const [provider, setProvider] = useState<Providers>(initialProvider);
  const [providerDetails, setProviderDetails] = useState<OssoProviderDetails>();

  useEffect(() => {
    if (!provider) return;
    setProviderDetails(providers[provider]);
  }, [provider]);

  return {
    provider,
    setProvider,
    providers,
    providerDetails,
  };
};

export default useOssoFields;
