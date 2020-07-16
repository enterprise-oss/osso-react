var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import OssoContext from '~client';
export var ACCOUNT_QUERY = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query EnterpriseAccount($domain: String!) {\n    enterpriseAccount(domain: $domain) {\n      id\n      domain\n      name\n      status\n      identityProviders {\n        id\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"], ["\n  query EnterpriseAccount($domain: String!) {\n    enterpriseAccount(domain: $domain) {\n      id\n      domain\n      name\n      status\n      identityProviders {\n        id\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"])));
var useEnterpriseAccount = function (domain) {
    var client = useContext(OssoContext).client;
    var _a = useState({}), data = _a[0], setData = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(undefined), error = _c[0], setError = _c[1];
    if (client === undefined) {
        throw new Error('useEnterpriseAccount must be used inside an OssoProvider');
    }
    useEffect(function () {
        client === null || client === void 0 ? void 0 : client.query({ query: ACCOUNT_QUERY, variables: { domain: domain } }).then(function (response) {
            setData(response === null || response === void 0 ? void 0 : response.data);
            setLoading(false);
        }).catch(function (e) {
            setError(e);
            setLoading(false);
        });
    }, [client]);
    var observable = client.watchQuery({ query: ACCOUNT_QUERY, variables: { domain: domain } });
    observable
        .result()
        .then(function (response) {
        setData(response === null || response === void 0 ? void 0 : response.data);
        setLoading(false);
    })
        .catch(function (e) {
        setError(e);
        setLoading(false);
    });
    return {
        data: data,
        loading: loading,
        error: error,
    };
};
export default useEnterpriseAccount;
var templateObject_1;
