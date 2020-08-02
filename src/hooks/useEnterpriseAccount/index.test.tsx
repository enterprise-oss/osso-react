/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react-hooks';
import faker from 'faker';
import React, { ReactElement } from 'react';

import useEnterpriseAccount, { ACCOUNT_QUERY } from './index';

const domain = faker.internet.domainName();

const mocks = [
  {
    request: {
      query: ACCOUNT_QUERY,
      variables: { domain },
    },
    result: {
      data: {
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
      },
    },
  },
];

const mockedProvider = ({ children }: { children: ReactElement }) => (
  <MockedProvider addTypename={false} mocks={mocks}>
    {children}
  </MockedProvider>
);

jest.mock('~/client', () => {
  return jest.fn().mockImplementation(() => {
    return { OssoProvider: MockedProvider };
  });
});

describe('client context', () => {
  let rendered: any;
  test('fetches an account in an <OssoProvider>', async (done) => {
    act(() => {
      rendered = renderHook(() => useEnterpriseAccount(domain), {
        wrapper: mockedProvider,
      });
    });

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.enterpriseAccount.domain).toEqual(domain);
    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useEnterpriseAccount(domain));
  expect(result.error.message).toContain('useEnterpriseAccounts must be used inside an OssoProvider');
});
