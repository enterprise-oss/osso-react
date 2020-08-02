import { act, renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';
import React, { ReactElement } from 'react';

import { OssoProvider } from '~/client';

import response, { domain } from './__fixtures__';
import useEnterpriseAccount from './index';

const mockedProvider = ({ children }: { children: ReactElement }) => (
  <OssoProvider client={{ uri: 'example' }}>{children}</OssoProvider>
);

describe('client context', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rendered: any;
  test('fetches an account in an <OssoProvider>', async (done) => {
    fetch.mockResponseOnce(JSON.stringify({ data: response }));

    act(() => {
      rendered = renderHook(() => useEnterpriseAccount(domain), {
        wrapper: mockedProvider,
      });
    });
    expect(rendered.result.current.loading).toEqual(true);

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.enterpriseAccount.domain).toEqual(domain);
    expect(rendered.result.current.loading).toEqual(false);
    expect(rendered.result.current.error).toEqual(undefined);
    expect(fetch.mock.calls.length).toEqual(1);
    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useEnterpriseAccount(domain));
  expect(result.error.message).toContain('useEnterpriseAccounts must be used inside an OssoProvider');
});
