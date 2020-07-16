var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import OssoContext from '~client';
var CONFIGURE_PROVIDER = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation ConfigureIdentityProvider($input: ConfigureIdentityProviderInput!) {\n    configureIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"], ["\n  mutation ConfigureIdentityProvider($input: ConfigureIdentityProviderInput!) {\n    configureIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"])));
var configureIdentityProvider = function () {
    var client = useContext(OssoContext).client;
    if (client === undefined) {
        throw new Error('configureIdentityProvider must be used inside an OssoProvider');
    }
    var _a = useMutation(CONFIGURE_PROVIDER, {
        client: client,
    }), configureProvider = _a[0], _b = _a[1], data = _b.data, loading = _b.loading, error = _b.error;
    return {
        configureProvider: function (id, configData) { return configureProvider({ variables: { input: __assign({ id: id }, configData) } }); },
        data: data,
        loading: loading,
        error: error,
    };
};
export default configureIdentityProvider;
var templateObject_1;
