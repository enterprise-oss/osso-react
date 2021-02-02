import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Other,
  label: 'Generic SAML 2.0',
  description: 'Customer IDP not listed - use generic SAML',
  primary: false,
  iconUrl: 'https://assets.ossoapp.io/icons/saml.svg',
  ossoGeneratedFields: {
    manual: [
      {
        name: 'ssoIssuer',
        inputProps: {
          id: 'osso-generic-saml-entity-id',
          label: 'Entity ID',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1049 },
      },
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-generic-saml-acs-url',
          label: 'Single sign on URL',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1102, size: 8 },
      },
      {
        name: 'acsUrlValidator',
        inputProps: {
          id: 'osso-generic-saml-acs-url-validator',
          label: 'ACS URL Validator',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1155, size: 8 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: { x: 36, y: 396 },
      },
      {
        name: 'name',
        pdfProps: { x: 324, y: 737 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 80, y: 805 },
      },
    ],
  },
  idpGeneratedFields: {
    metadataXml: {
      accept: '.xml',
      id: 'osso-generic-saml-metadata-xml',
      label: 'Metadata XML',
      type: 'textarea',
      readOnly: false,
      copyable: false,
    },
    manual: [
      {
        name: 'ssoUrl',
        inputProps: {
          id: 'osso-generic-saml-sso-url',
          label: 'Identity Provider Single Sign-On URL',
          type: 'text',
          readOnly: false,
          copyable: false,
        },
      },
      {
        name: 'ssoCert',
        inputProps: {
          id: 'osso-generic-saml-sso-cert',
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
