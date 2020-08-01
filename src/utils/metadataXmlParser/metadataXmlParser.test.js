import azureMetadata from '~/__fixtures__/azure_federated_metadata.xml';
import oktaMetadata from '~/__fixtures__/okta_federated_metadata.xml';

import parseMetadataXML from './metadataXmlParser';

// For Identity Providers that support a Federated Metadata XML,
// we unit test that parsing actual files from test instances are
// properly parsed for necessary values

describe('for Okta', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(oktaMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for Azure', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(azureMetadata);
    expect(result).toMatchSnapshot();
  });
});
