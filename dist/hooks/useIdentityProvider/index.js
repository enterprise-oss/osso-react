var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';
import OssoContext from '~client';
var PROVIDER_QUERY = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query IdentityProvider($id: ID!) {\n    identityProvider(id: $id) {\n      id\n      service\n      acsUrl\n      ssoCert\n      ssoUrl\n    }\n  }\n"], ["\n  query IdentityProvider($id: ID!) {\n    identityProvider(id: $id) {\n      id\n      service\n      acsUrl\n      ssoCert\n      ssoUrl\n    }\n  }\n"])));
var useProvider = function (providerId) {
    var client = useContext(OssoContext).client;
    if (client === undefined) {
        throw new Error('useProvider must be used inside an OssoProvider');
    }
    var _a = useQuery(PROVIDER_QUERY, {
        variables: { id: providerId },
        client: client,
    }), data = _a.data, loading = _a.loading, error = _a.error;
    return {
        data: data,
        loading: loading,
        error: error,
    };
};
export default useProvider;
var templateObject_1;
