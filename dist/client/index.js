import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import React, { createContext } from 'react';
var cache = new InMemoryCache();
var link;
var client;
var buildClient = function (clientOptions) {
    var uri = (clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.uri) || '/graphql';
    link = new HttpLink({
        uri: uri,
        credentials: (clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.cors) || 'same-origin',
    });
    return new ApolloClient({
        cache: cache,
        link: link,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
        },
    });
};
var defaultValue = {
    client: undefined,
};
var OssoContext = createContext(defaultValue);
var OssoProvider = function (_a) {
    var children = _a.children, clientOptions = _a.client;
    var client = buildClient(clientOptions);
    return React.createElement(OssoContext.Provider, { value: { client: client } },
        children,
        " ");
};
export default OssoContext;
export { OssoProvider, client };
