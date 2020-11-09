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
        pdfProps: { x: 56, y: 996, size: 8 },
      },
      {
        name: 'ssoIssuer',
        inputProps: {
          id: 'osso-google-entity-id',
          label: 'Audience URI (SP Entity ID)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1049 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: { x: 40, y: 323 },
      },
      {
        name: 'name',
        pdfProps: { x: 354, y: 783 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 81, y: 891 },
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
