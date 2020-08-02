import { act, renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';
import React, { ReactElement } from 'react';

import { OssoProvider } from '~/client';

import response from './__mocks__';
import useEnterpriseAccounts from './index';

const mockedProvider = ({ children }: { children: ReactElement }) => (
  <OssoProvider client={{ uri: 'example' }}>{children}</OssoProvider>
);

describe('client context', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rendered: any;
  test('fetches accounts in an <OssoProvider>', async (done) => {
    fetch.mockResponseOnce(JSON.stringify({ data: response }));

    act(() => {
      rendered = renderHook(() => useEnterpriseAccounts(), {
        wrapper: mockedProvider,
      });
    });

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.enterpriseAccounts.edges.length).toEqual(10);
    expect(rendered.result.current.loading).toEqual(false);
    expect(rendered.result.current.error).toEqual(undefined);

    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useEnterpriseAccounts());
  expect(result.error.message).toContain('useEnterpriseAccounts must be used inside an OssoProvider');
});
