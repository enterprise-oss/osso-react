import Icon from '~/resources/google.svg';

import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Google,
  label: 'Google (SAML)',
  icon: Icon,
  ossoGeneratedFields: {
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-google-acs-url',
          label: 'Single sign on URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'domain',
        inputProps: {
          id: 'osso-google-entity-id',
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
      id: 'osso-google-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-google-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-google-sso-cert',
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
