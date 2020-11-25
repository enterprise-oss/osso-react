import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Salesforce,
  label: 'Salesforce',
  iconUrl: 'https://assets.ossoapp.io/icons/salesforce.svg',
  ossoGeneratedFields: {
    manual: [
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-salesforce-acs-url',
          label: 'ACS URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 87, y: 135, size: 8 },
      },
      {
        name: 'ssoIssuer',
        inputProps: {
          id: 'osso-salesforce-entity-id',
          label: 'Entity Id',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 87, y: 166 },
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
      id: 'osso-salesforce-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-salesforce-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-salesforce-sso-cert',
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
