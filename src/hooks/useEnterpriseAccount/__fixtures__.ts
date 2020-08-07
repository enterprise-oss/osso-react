import faker from 'faker';

export const domain = faker.internet.domainName();

export default {
  enterpriseAccount: {
    domain,
    id: '9e4ec9d4-e1dd-44f6-9877-3686f84edf13',
    name: 'newset',
    status: 'active',
    identityProviders: [
      {
        id: 'b466d079-4211-460e-8d4f-62ca03626486',
        service: 'OKTA',
        acsUrl: 'http://localhost:9292/auth/saml/b466d079-4211-460e-8d4f-62ca03626486/callback',
        documentationPdfUrl:
          'http://localhost:9292/identity_provider/documentation/b466d079-4211-460e-8d4f-62ca03626486',
        ssoUrl: null,
        status: 'Pending',
      },
    ],
  },
};