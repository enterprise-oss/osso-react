import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';
import React, { ReactElement, useContext } from 'react';

import OssoContext, { OssoProvider } from '~/client';
import { OssoUser } from '~/types';

const userData: OssoUser = {
  id: 'id',
  email: 'user@example.com',
  scope: 'admin',
  oauthClientId: 'clientId',
};

export const mockedProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://example.com/graphql',
    }),
  });

  return <OssoContext.Provider value={{ client, currentUser: userData }}>{children}</OssoContext.Provider>;
};

describe('OssoProvider', () => {
  test('makes current user available in OssoContext', async (done) => {
    await act(async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: { currentUser: userData } }));

      await act(async () => {
        const rendered = renderHook(() => useContext(OssoContext), { wrapper: OssoProvider });
        await rendered.waitForValueToChange(() => rendered.result.current.currentUser !== undefined);

        expect(rendered?.result?.current?.currentUser?.email).toEqual('user@example.com');
      });

      done();
    });
  });
});
