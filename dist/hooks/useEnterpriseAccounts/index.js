var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql } from '@apollo/client';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import OssoContext from '~client';
var ACCOUNTS_QUERY = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query EnterpriseAccounts {\n    enterpriseAccounts {\n      id\n      domain\n      name\n      status\n    }\n  }\n"], ["\n  query EnterpriseAccounts {\n    enterpriseAccounts {\n      id\n      domain\n      name\n      status\n    }\n  }\n"])));
var useEnterpriseAccounts = function () {
    var context = useContext(OssoContext);
    var client = context === null || context === void 0 ? void 0 : context.client;
    var _a = useState({}), data = _a[0], setData = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(undefined), error = _c[0], setError = _c[1];
    useEffect(function () {
        client === null || client === void 0 ? void 0 : client.query({ query: ACCOUNTS_QUERY }).then(function (response) {
            setData(response === null || response === void 0 ? void 0 : response.data);
            setLoading(false);
        }).catch(function (e) {
            setError(e);
            setLoading(false);
        });
    }, [client]);
    if (client === undefined) {
        return {
            data: null,
            loading: false,
            error: 'useEnterpriseAccounts must be used inside an OssoProvider',
        };
    }
    return {
        data: data,
        loading: loading,
        error: error,
    };
};
export default useEnterpriseAccounts;
var templateObject_1;
