import Icon from '~/resources/ping.svg';

import { OssoProvider, Providers } from '../index.types';

export default {
  value: Providers.Ping,
  label: 'Ping',
  icon: Icon,
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
        pdfProps: { x: 87, y: 135, size: 8 },
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
        pdfProps: { x: 87, y: 166 },
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
