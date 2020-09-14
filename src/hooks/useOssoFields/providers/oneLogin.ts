import Icon from '~/resources/one-login.svg';

import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.OneLogin,
  label: 'OneLogin',
  icon: Icon,
  ossoGeneratedFields: {
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-one-login-acs-url',
          label: 'Single sign on URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'domain',
        inputProps: {
          id: 'osso-one-login-entity-id',
          label: 'Audience URI (SP Entity ID)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
    ],
  },
  idpGeneratedFields: {
    metadataXml: {
      accept: '.xml',
      id: 'osso-one-login-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-one-login-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-one-login-sso-cert',
          label: 'X.509 Certificate',
          type: 'textarea',
          readOnly: false,
          copyable: false,
        },
      },
    ],
  },
  serviceProviderMetadata: false,
} as OssoProvider;
