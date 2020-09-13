import Icon from '~/resources/azure.svg';

import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Azure,
  label: 'Azure',
  icon: Icon,
  ossoGeneratedFields: {
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-azure-acs-url',
          label: 'Reply URL (Assertion Consumer Service URL)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'domain',
        inputProps: {
          id: 'osso-azure-entity-id',
          label: 'Identifier (Entity ID)',
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
      id: 'osso-azure-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    // TODO: this needs to proxy the API due to CORS restrictions
    // metadataUrl: {
    //   id: 'osso-azure-metadata-url',
    //   label: 'Metadata Endpoint',
    //   type: 'text',
    //   readOnly: false,
    //   copyable: false,
    // },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-azure-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-azure-sso-cert',
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
