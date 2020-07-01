import { OssoProviderDetails, ProviderMap, Providers } from './index.types';

const providers: ProviderMap<Providers> = {
  [Providers.Azure]: {
    value: Providers.Azure,
    label: 'Azure',
    ossoGeneratedFields: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-acs-url',
          label: 'Reply URL (Assertion Consumer Service URL)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          id: 'osso-entity-id',
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
          id: 'osso-acs-url',
          label: 'Single Sign On URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'id',
        inputProps: {
          id: 'osso-entity-id',
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

const useOssoFields = (): {
  fieldsForProvider: (provider: Providers) => OssoProviderDetails;
  providers: ProviderMap<Providers>;
} => {
  const fieldsForProvider = (provider: Providers) => {
    return providers[provider];
  };

  return {
    providers,
    fieldsForProvider,
  };
};

export default useOssoFields;
