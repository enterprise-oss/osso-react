import fs from 'fs';
import fetch from 'jest-fetch-mock';

import generateDocumentation from './index';
const appConfig = {
  name: 'SaaS App',
  logoUrl: 'https://s3.aws.com/bucket/logo.png',
  contactEmail: 'support@saasapp.com',
};
describe('for Okta', () => {
  test('it writes a PDF', async (done) => {
    fetch.dontMock();
    expect(function write() {
      fs.readFile('__fixtures__/okta.pdf', async (err, data) => {
        if (err) throw err;
        const uint8Array = new Uint8Array(data);
        const result = await generateDocumentation(
          uint8Array,
          {
            acsUrl: 'https://example.ossoapp.io/auth/saml/a2533317-1f77-473c-abbb-083d728253c9/callback',
            domain: 'example.com',
            service: 'OKTA',
          },
          appConfig,
        );
        const path = `__artifacts__/okta-docs.pdf`;
        fs.writeFileSync(path, result);
        done();
      });
    }).not.toThrow();
  });
});

describe('for Azure ADFS', () => {
  test('it writes a PDF', async (done) => {
    fetch.dontMock();
    expect(function write() {
      fs.readFile('__fixtures__/azure.pdf', async (err, data) => {
        if (err) throw err;
        const uint8Array = new Uint8Array(data);
        const result = await generateDocumentation(
          uint8Array,
          {
            acsUrl: 'https://example.ossoapp.io/auth/saml/a2533317-1f77-473c-abbb-083d728253c9/callback',
            domain: 'example.com',
            service: 'AZURE',
          },
          appConfig,
        );

        const path = `__artifacts__/azure-docs.pdf`;
        fs.writeFileSync(path, result);

        done();
      });
    }).not.toThrow();
  });
});
