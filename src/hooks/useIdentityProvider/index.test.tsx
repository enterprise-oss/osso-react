import { act, renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';
import React, { ReactElement } from 'react';

import { OssoProvider } from '~/client';

import response from './__fixtures__';
import useIdentityProvider from './index';

const mockedProvider = ({ children }: { children: ReactElement }) => (
  <OssoProvider client={{ uri: 'example' }}>{children}</OssoProvider>
);

describe('client context', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rendered: any;
  test('fetches accounts in an <OssoProvider>', async (done) => {
    fetch.mockResponseOnce(JSON.stringify({ data: response }));

    act(() => {
      rendered = renderHook(() => useIdentityProvider('id'), {
        wrapper: mockedProvider,
      });
    });

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.identityProvider.id).toBeTruthy();
    expect(rendered.result.current.loading).toEqual(false);
    expect(rendered.result.current.error).toEqual(undefined);

    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useIdentityProvider('id'));
  expect(result.error.message).toContain('useIdentityProvider must be used inside an OssoProvider');
});
