// NB: curerntly supports Okta and Azure, but may need TLC
// as we add more IDPs
import { parse } from 'fast-xml-parser';

export default function parseMetadataXML(xml: string): { ssoUrl: string; ssoCert: string } {
  const jsonObj = parse(xml, {
    attributeNamePrefix: '',
    ignoreNameSpace: true,
    ignoreAttributes: false,
  });

  const {
    EntityDescriptor: {
      IDPSSODescriptor: {
        SingleSignOnService,
        KeyDescriptor: {
          KeyInfo: {
            X509Data: { X509Certificate },
          },
        },
      },
    },
  } = jsonObj;

  return {
    ssoCert: X509Certificate,
    ssoUrl: SingleSignOnService[0].Location,
  };
}
