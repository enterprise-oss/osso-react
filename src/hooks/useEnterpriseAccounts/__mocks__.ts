export default {
  enterpriseAccounts: {
    pageInfo: {
      hasNextPage: true,
      endCursor: 'MTA',
      __typename: 'PageInfo',
    },
    totalCount: 12,
    edges: [
      {
        node: {
          domain: 'intro.com',
          id: '9e4ec9d4-e1dd-44f6-9877-3686f84edf13',
          identityProviders: [
            {
              id: 'b466d079-4211-460e-8d4f-62ca03626486',
              service: 'OKTA',
              domain: 'intro.com',
              acsUrl: 'http://localhost:9292/auth/saml/b466d079-4211-460e-8d4f-62ca03626486/callback',
              ssoCert: null,
              ssoUrl: null,
              status: 'Pending',
              __typename: 'IdentityProvider',
            },
          ],
          name: 'newset',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'another.com',
          id: '5fab997c-0051-4928-925d-a0779d60a8cc',
          identityProviders: [],
          name: 'anothre',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'shawn.com',
          id: '07e32793-5d30-4902-a89d-5c27fca1483f',
          identityProviders: [
            {
              id: '4491a541-e906-4caf-9a51-3653c3bec6e6',
              service: 'OKTA',
              domain: 'shawn.com',
              acsUrl: 'http://localhost:9292/auth/saml/4491a541-e906-4caf-9a51-3653c3bec6e6/callback',
              ssoCert: null,
              ssoUrl: null,
              status: 'Pending',
              __typename: 'IdentityProvider',
            },
          ],
          name: 'shawn',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'zoom.us',
          id: 'b89917fb-9b05-45aa-92e7-7f5952c4d2be',
          identityProviders: [],
          name: 'zoom',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'acme.com',
          id: 'd0516e52-1cc4-4b6e-8eec-ebbb06622da1',
          identityProviders: [],
          name: 'acme',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'facebook.com',
          id: 'a53531f8-c7cd-4bda-af4a-6223878c88a2',
          identityProviders: [],
          name: 'facebook',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'dog.com',
          id: 'ea42f270-de5e-4178-82f4-05a666bcb3b5',
          identityProviders: [],
          name: 'd',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'sam.com',
          id: 'af18f111-24ad-4b24-a1c4-aad113a84a35',
          identityProviders: [
            {
              id: '8e980a8b-3b51-4fee-ad3c-05c535ee1dcc',
              service: 'OKTA',
              domain: 'sam.com',
              acsUrl: 'http://localhost:9292/auth/saml/8e980a8b-3b51-4fee-ad3c-05c535ee1dcc/callback',
              ssoCert: null,
              ssoUrl: null,
              status: 'Pending',
              __typename: 'IdentityProvider',
            },
          ],
          name: 'sam',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'abc.com',
          id: '29bc9fa3-edf9-4849-8d62-68bd98b91096',
          identityProviders: [],
          name: 'sdfdsf',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
      {
        node: {
          domain: 'ss.org',
          id: '52c0c81e-f2e6-4d43-b9b6-1eac6edb76bb',
          identityProviders: [],
          name: 's',
          status: 'active',
          __typename: 'EnterpriseAccount',
        },
        __typename: 'EnterpriseAccountEdge',
      },
    ],
    __typename: 'EnterpriseAccountConnection',
  },
};
