import { act, renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';

import { mockedProvider } from '~/client/index.test';

import response from './__fixtures__';
import useOAuthClients from './index';

describe('client context', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rendered: any;
  test('fetches accounts in an <OssoProvider>', async (done) => {
    fetch.mockResponseOnce(JSON.stringify({ data: response }));

    act(() => {
      rendered = renderHook(() => useOAuthClients(), {
        wrapper: mockedProvider,
      });
    });

    await rendered.waitForValueToChange(() => rendered.result.current.data !== undefined);

    expect(rendered.result.current.data.oauthClients.length).toEqual(3);
    expect(rendered.result.current.loading).toEqual(false);
    expect(rendered.result.current.error).toEqual(undefined);

    done();
  });
});

test('throws an error when used outside of an <OssoProvider>', () => {
  const { result } = renderHook(() => useOAuthClients());
  expect(result.error.message).toContain('useOAuthClients must be used inside an OssoProvider');
});
