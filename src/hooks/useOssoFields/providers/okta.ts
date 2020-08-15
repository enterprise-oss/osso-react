import Icon from '~/resources/okta.svg';

import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Okta,
  label: 'Okta',
  icon: Icon,
  ossoGeneratedFields: {
    documentationPdfUrl: {
      id: 'osso-okta-documentation-download',
      label: 'Documentation PDF',
      type: 'text',
    },
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-okta-acs-url',
          label: 'Single sign on URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
      },
      {
        name: 'domain',
        inputProps: {
          id: 'osso-okta-entity-id',
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
      id: 'osso-okta-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    // TODO: this needs to proxy the API due to CORS restrictions
    // metadataUrl: {
    //   id: 'osso-okta-metadata-url',
    //   label: 'Metadata Endpoint',
    //   type: 'text',
    //   readOnly: false,
    //   copyable: false,
    // },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-okta-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-okta-sso-cert',
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
