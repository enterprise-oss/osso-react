import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { ReactElement } from 'react';
import { OssoContextValue, OssoProviderProps } from './index.types';
declare let client: ApolloClient<NormalizedCacheObject>;
declare const OssoContext: React.Context<OssoContextValue>;
declare const OssoProvider: ({ children, client: clientOptions }: OssoProviderProps) => ReactElement;
export default OssoContext;
export { OssoProvider, client };
