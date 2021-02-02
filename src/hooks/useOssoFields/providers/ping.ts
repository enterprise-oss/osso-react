import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Ping,
  label: 'Ping',
  primary: true,
  description: 'PingID cloud identity provider',
  iconUrl: 'https://assets.ossoapp.io/icons/ping.svg',
  ossoGeneratedFields: {
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-ping-acs-url',
          label: 'ACS URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 52, y: 1490, size: 8 },
      },
      {
        name: 'ssoIssuer',
        inputProps: {
          id: 'osso-ping-entity-id',
          label: 'ENTITY ID',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 52, y: 1543 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: { x: 36, y: 322 },
      },
      {
        name: 'name',
        pdfProps: { x: 311, y: 1126 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 80, y: 1246 },
      },
    ],
  },
  idpGeneratedFields: {
    metadataXml: {
      accept: '.xml',
      id: 'osso-ping-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-ping-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-ping-sso-cert',
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
