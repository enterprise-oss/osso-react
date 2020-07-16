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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import OssoContext from '~client';
import { ACCOUNT_QUERY } from '~hooks/useEnterpriseAccount/index';
var CREATE_PROVIDER = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {\n    createIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n      }\n    }\n  }\n"], ["\n  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {\n    createIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n      }\n    }\n  }\n"])));
var createIdentityProvider = function () {
    var client = useContext(OssoContext).client;
    if (client === undefined) {
        throw new Error('createIdentityProvider must be used inside an OssoProvider');
    }
    var _a = useMutation(CREATE_PROVIDER, {
        client: client,
        update: function (cache, _a) {
            var identityProvider = _a.data.createIdentityProvider.identityProvider;
            var data = cache.readQuery({
                query: ACCOUNT_QUERY,
                variables: { domain: identityProvider.domain },
            });
            var enterpriseAccount = data === null || data === void 0 ? void 0 : data.enterpriseAccount;
            if (!enterpriseAccount)
                return;
            cache.writeQuery({
                query: ACCOUNT_QUERY,
                variables: { domain: identityProvider.domain },
                data: {
                    enterpriseAccount: __assign(__assign({}, enterpriseAccount), { identityProviders: __spreadArrays(enterpriseAccount.identityProviders, [identityProvider]) }),
                },
            });
        },
    }), createProvider = _a[0], _b = _a[1], data = _b.data, loading = _b.loading, error = _b.error;
    return {
        createProvider: function (enterpriseAccountId, providerService) {
            console.log({ variables: { input: { enterpriseAccountId: enterpriseAccountId, providerService: providerService } } });
            createProvider({ variables: { input: { enterpriseAccountId: enterpriseAccountId, providerService: providerService } } });
        },
        data: data,
        loading: loading,
        error: error,
    };
};
export default createIdentityProvider;
var templateObject_1;
