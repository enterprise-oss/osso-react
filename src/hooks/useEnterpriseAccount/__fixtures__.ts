import faker from 'faker';

export const domain = faker.internet.domainName();

export default {
  enterpriseAccount: {
    domain,
    id: '9e4ec9d4-e1dd-44f6-9877-3686f84edf13',
    name: 'newset',
    status: 'active',
    usersCount: 200,
    identityProviders: [
      {
        id: 'b466d079-4211-460e-8d4f-62ca03626486',
        service: 'OKTA',
        acsUrl: 'http://localhost:9292/auth/saml/b466d079-4211-460e-8d4f-62ca03626486/callback',
        acsUrlValidator: 'http://localhost:9292/auth/saml/b466d079\\-4211\\-460e\\-8d4f\\-62ca03626486/callback',
        domain,
        ssoUrl: null,
        ssoIssuer: `http://localhost:9292/${domain}`,
        status: 'Pending',
      },
    ],
    createdAt: '2020-08-12T18:40:00+0000',
    updatedAt: '2020-08-12T18:40:00+0000',
  },
};
