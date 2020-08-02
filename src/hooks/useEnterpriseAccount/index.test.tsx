import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactElement } from 'react';

import enterpriseAccountQueryMock, { domain } from './__mocks__';
import useEnterpriseAccount from './index';

const mockedProvider = ({ children }: { children: ReactElement }) => (
  <MockedProvider addTypename={false} mocks={enterpriseAccountQueryMock}>
    {children}
  </MockedProvider>
);

describe('client context', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rendered: any;
  test('fetches an account in an <OssoProvider>', async (done) => {
    act(() => {
      rendered = renderHook(() => useEnterpriseAccount(domain), {
        wrapper: mockedProvider,
      });
    });

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.enterpriseAccount.domain).toEqual(domain);
    expect(rendered.result.current.loading).toEqual(false);
    expect(rendered.result.current.error).toEqual(undefined);
    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useEnterpriseAccount(domain));
  expect(result.error.message).toContain('useEnterpriseAccounts must be used inside an OssoProvider');
});
