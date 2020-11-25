import azureMetadata from '~/__fixtures__/azure_federated_metadata.xml';
import googleMetadata from '~/__fixtures__/google_federated_metadata.xml';
import oktaMetadata from '~/__fixtures__/okta_federated_metadata.xml';
import oneLoginMetadata from '~/__fixtures__/onelogin_federated_metadata.xml';
import pingMetadata from '~/__fixtures__/ping_federated_metadata.xml';
import salesforceMetadata from '~/__fixtures__/salesforce_metadata.xml';

import parseMetadataXML from './metadataXmlParser';

// For Identity Providers that support a Federated Metadata XML,
// we unit test that parsing actual files from test instances are
// properly parsed for necessary values

describe('for Azure', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(azureMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for Google', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(googleMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for Okta', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(oktaMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for OneLogin', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(oneLoginMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for Ping', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(pingMetadata);
    expect(result).toMatchSnapshot();
  });
});

describe('for Salesforce', () => {
  test('it properly parses a federated metadata XML file', () => {
    const result = parseMetadataXML(salesforceMetadata);
    expect(result).toMatchSnapshot();
  });
});
