import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Salesforce,
  label: 'Salesforce',
  primary: true,
  description: 'Salesforce.com instance as an Identity Provider',
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
        pdfProps: { x: 52, y: 2464, size: 8 },
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
        pdfProps: { x: 52, y: 2411 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: { x: 36, y: 388 },
      },
      {
        name: 'name',
        pdfProps: { x: 52, y: 2074 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 52, y: 2233 },
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
