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
        pdfProps: { x: 56, y: 1713, size: 8 },
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
        pdfProps: { x: 56, y: 1554 },
      },

      {
        name: 'acsUrlValidator',
        inputProps: {
          id: 'osso-one-login-acs-url-validator',
          label: 'ACS URL Validator',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1660, size: 8 },
      },
      {
        name: 'acsUrl',
        inputProps: {
          id: 'osso-one-login-recipient',
          label: 'Recipient',
          type: 'text',
          readOnly: true,
          copyable: true,
        },
        pdfProps: { x: 56, y: 1607, size: 8 },
      },
    ],
    appDetails: [
      {
        name: 'contactEmail',
        pdfProps: {
          x: 42,
          y: 389,
        },
      },
      {
        name: 'name',
        pdfProps: { x: 326, y: 1044 },
      },
      {
        name: 'logoUrl',
        pdfProps: { x: 81, y: 1164 },
      },
    ],
  },
  idpGeneratedFields: {
    metadataXml: {
      accept: '.xml',
      id: 'osso-one-login-metadata-xml',
      label: 'Metadata XML',
      type: 'file',
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
