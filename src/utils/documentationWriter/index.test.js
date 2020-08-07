import fs from 'fs';

import generateDocumentation from './index';

describe('for Okta', () => {
  test('it writes a PDF', async (done) => {
    expect(function write() {
      fs.readFile('__fixtures__/okta.pdf', async (err, data) => {
        if (err) throw err;
        const uint8Array = new Uint8Array(data);
        const result = await generateDocumentation(uint8Array, { acsUrl: 'https://osso-acs-url.com' });
        const path = `__artifacts__/okta-docs.pdf`;
        fs.writeFileSync(path, result);
        done();
      });
    }).not.toThrow();
  });
});

describe('for Okta', () => {
  test('it writes a PDF', async (done) => {
    expect(function write() {
      fs.readFile('__fixtures__/azure.pdf', async (err, data) => {
        if (err) throw err;
        const uint8Array = new Uint8Array(data);
        const result = await generateDocumentation(uint8Array, { acsUrl: 'https://osso-acs-url.com' });

        const path = `__artifacts__/azure-docs.pdf`;
        fs.writeFileSync(path, result);

        done();
      });
    }).not.toThrow();
  });
});
