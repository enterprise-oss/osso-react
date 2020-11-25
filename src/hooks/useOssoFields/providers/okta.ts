import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Okta,
  label: 'Okta',
  iconUrl: 'https://assets.ossoapp.io/icons/okta.svg',
  ossoGeneratedFields: {
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
        pdfProps: { x: 55, y: 2009, size: 8 },
      },
      {
        name: 'ssoIssuer',
        inputProps: {
          id: 'osso-okta-entity-id',
          label: 'Audience URI (SP Entity ID)',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 55, y: 2167 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: { x: 45, y: 388 },
      },
      {
        name: 'name',
        pdfProps: { x: 215, y: 1615 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 81, y: 1684 },
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
