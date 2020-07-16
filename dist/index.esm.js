import { InMemoryCache, ApolloClient, HttpLink, gql, useMutation, useQuery } from '@apollo/client';
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

var cache = new InMemoryCache();
var link;
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

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
var templateObject_1;

var ACCOUNTS_QUERY = gql(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  query EnterpriseAccounts {\n    enterpriseAccounts {\n      id\n      domain\n      name\n      status\n    }\n  }\n"], ["\n  query EnterpriseAccounts {\n    enterpriseAccounts {\n      id\n      domain\n      name\n      status\n    }\n  }\n"])));
var useEnterpriseAccounts = function () {
    var client = useContext(OssoContext).client;
    if (client === undefined) {
        throw new Error('createEnterpriseAccount must be used inside an OssoProvider');
    }
    var _a = useQuery(ACCOUNTS_QUERY, { client: client }), data = _a.data, loading = _a.loading, error = _a.error;
    // useEffect(() => {
    //   client
    //     ?.query({ query: ACCOUNTS_QUERY })
    //     .then((response) => {
    //       setData(response?.data);
    //       setLoading(false);
    //     })
    //     .catch((e) => {
    //       setError(e);
    //       setLoading(false);
    //     });
    // }, [client]);
    // if (client === undefined) {
    //   return {
    //     data: null,
    //     loading: false,
    //     error: 'useEnterpriseAccounts must be used inside an OssoProvider',
    //   };
    // }
    return {
        data: data,
        loading: loading,
        error: error,
    };
};
var templateObject_1$1;

var CREATE_ACCOUNT = gql(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  mutation CreateEnterpriseAccount($input: CreateEnterpriseAccountInput!) {\n    createEnterpriseAccount(input: $input) {\n      enterpriseAccount {\n        id\n        domain\n        name\n        status\n      }\n    }\n  }\n"], ["\n  mutation CreateEnterpriseAccount($input: CreateEnterpriseAccountInput!) {\n    createEnterpriseAccount(input: $input) {\n      enterpriseAccount {\n        id\n        domain\n        name\n        status\n      }\n    }\n  }\n"])));
var createEnterpriseAccount = function () {
    var client = useContext(OssoContext).client;
    if (client === undefined) {
        throw new Error('createEnterpriseAccount must be used inside an OssoProvider');
    }
    var _a = useMutation(CREATE_ACCOUNT, {
        client: client,
        update: function (cache, _a) {
            var enterpriseAccount = _a.data.createEnterpriseAccount.enterpriseAccount;
            var data = cache.readQuery({
                query: ACCOUNTS_QUERY,
            });
            cache.writeQuery({
                query: ACCOUNTS_QUERY,
                data: {
                    enterpriseAccounts: __spreadArrays(data === null || data === void 0 ? void 0 : data.enterpriseAccounts, [enterpriseAccount]),
                },
            });
        },
    }), createAccount = _a[0], _b = _a[1], data = _b.data, loading = _b.loading, error = _b.error;
    return {
        createAccount: function (name, domain) {
            createAccount({ variables: { input: { name: name, domain: domain } } });
        },
        data: data,
        loading: loading,
        error: error,
    };
};
var templateObject_1$2;

var ACCOUNT_QUERY = gql(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  query EnterpriseAccount($domain: String!) {\n    enterpriseAccount(domain: $domain) {\n      id\n      domain\n      name\n      status\n      identityProviders {\n        id\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"], ["\n  query EnterpriseAccount($domain: String!) {\n    enterpriseAccount(domain: $domain) {\n      id\n      domain\n      name\n      status\n      identityProviders {\n        id\n        service\n        acsUrl\n        ssoCert\n        ssoUrl\n      }\n    }\n  }\n"])));
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
var templateObject_1$3;

var CREATE_PROVIDER = gql(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {\n    createIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n      }\n    }\n  }\n"], ["\n  mutation CreateIdentityProvider($input: CreateIdentityProviderInput!) {\n    createIdentityProvider(input: $input) {\n      identityProvider {\n        id\n        domain\n        enterpriseAccountId\n        service\n        acsUrl\n      }\n    }\n  }\n"])));
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
var templateObject_1$4;

var PROVIDER_QUERY = gql(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  query IdentityProvider($id: ID!) {\n    identityProvider(id: $id) {\n      id\n      service\n      acsUrl\n      ssoCert\n      ssoUrl\n    }\n  }\n"], ["\n  query IdentityProvider($id: ID!) {\n    identityProvider(id: $id) {\n      id\n      service\n      acsUrl\n      ssoCert\n      ssoUrl\n    }\n  }\n"])));
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
var templateObject_1$5;

var Providers;
(function (Providers) {
    Providers["Azure"] = "AZURE";
    Providers["Okta"] = "OKTA";
})(Providers || (Providers = {}));
var Status;
(function (Status) {
    Status["new"] = "new";
    Status["active"] = "ACTIVE";
})(Status || (Status = {}));

var azure = {
    value: Providers.Azure,
    label: 'Azure',
    ossoGeneratedFields: [
        {
            name: 'acsUrl',
            inputProps: {
                id: 'osso-azure-acs-url',
                label: 'Reply URL (Assertion Consumer Service URL)',
                type: 'text',
                readOnly: true,
                copyable: true,
            },
        },
        {
            name: 'id',
            inputProps: {
                id: 'osso-azure-entity-id',
                label: 'Identifier (Entity ID)',
                type: 'text',
                readOnly: true,
                copyable: true,
            },
        },
    ],
    idpGeneratedFields: {
        metadataXml: {
            id: 'osso-azure-metadata-xml',
            label: 'Metadata XML',
            type: 'textarea',
            readOnly: false,
            copyable: false,
        },
        metadataUrl: {
            id: 'osso-azure-metadata-xml',
            label: 'Metadata Endpoint',
            type: 'text',
            readOnly: false,
            copyable: false,
        },
        manual: [
            {
                name: 'ssoUrl',
                inputProps: {
                    id: 'osso-azure-sso-url',
                    label: 'Identity Provider Single Sign-On URL',
                    type: 'text',
                    readOnly: false,
                    copyable: false,
                },
            },
            {
                name: 'ssoCert',
                inputProps: {
                    id: 'osso-azure-sso-cert',
                    label: 'X.509 Certificate',
                    type: 'textarea',
                    readOnly: false,
                    copyable: false,
                },
            },
        ],
    },
    serviceProviderMetadata: false,
};

var okta = {
    value: Providers.Okta,
    label: 'Okta',
    ossoGeneratedFields: [
        {
            name: 'acsUrl',
            inputProps: {
                id: 'osso-okta-acs-url',
                label: 'Single sign on URL',
                type: 'text',
                readOnly: true,
                copyable: true,
            },
        },
        {
            name: 'id',
            inputProps: {
                id: 'osso-okta-entity-id',
                label: 'Audience URI (SP Entity ID) ',
                type: 'text',
                readOnly: true,
                copyable: true,
            },
        },
    ],
    idpGeneratedFields: {
        metadataXml: {
            id: 'osso-okta-metadata-xml',
            label: 'Metadata XML',
            type: 'textarea',
            readOnly: false,
            copyable: false,
        },
        metadataUrl: {
            id: 'osso-okta-metadata-xml',
            label: 'Metadata Endpoint',
            type: 'text',
            readOnly: false,
            copyable: false,
        },
        manual: [
            {
                name: 'ssoUrl',
                inputProps: {
                    id: 'osso-okta-sso-url',
                    label: 'Identity Provider Single Sign-On URL',
                    type: 'text',
                    readOnly: false,
                    copyable: false,
                },
            },
            {
                name: 'ssoCert',
                inputProps: {
                    id: 'osso-okta-sso-cert',
                    label: 'X.509 Certificate',
                    type: 'textarea',
                    readOnly: false,
                    copyable: false,
                },
            },
        ],
    },
    serviceProviderMetadata: false,
};

var _a;
var providers = (_a = {},
    _a[Providers.Azure] = azure,
    _a[Providers.Okta] = okta,
    _a);
var useOssoFields = function () {
    var fieldsForProvider = function (provider) {
        return providers[provider];
    };
    return {
        providers: providers,
        fieldsForProvider: fieldsForProvider,
    };
};

var initialConfigState = {
    service: undefined,
    ssoUrl: undefined,
    ssoCert: undefined,
};
function configReducer(state, action) {
    switch (action.field) {
        case 'service':
            return { service: action.value };
        case 'ssoCert':
            return __assign(__assign({}, state), { ssoCert: action.value });
        case 'ssoUrl':
            return __assign(__assign({}, state), { ssoUrl: action.value });
        case 'metadataXml':
            // TODO: parse and return;
            return state;
        case 'metadataUrl':
            // TODO: fetch, parse and return;
            return state;
        case '*':
            return __assign(__assign({}, state), action.value);
    }
}
function IdpGeneratedFieldsComponent(_a) {
    var _b;
    var identityProvider = _a.identityProvider, InputComponent = _a.InputComponent, UploadComponent = _a.UploadComponent, ButtonComponent = _a.ButtonComponent, containerStyle = _a.containerStyle;
    var _c = useReducer(configReducer, initialConfigState), state = _c[0], dispatch = _c[1];
    var _d = useState({
        metadataUrl: undefined,
        metadataXml: undefined,
        manual: [],
    }), fields = _d[0], setFields = _d[1];
    var _e = useProvider(identityProvider.id), loading = _e.loading, data = _e.data;
    var fieldsForProvider = useOssoFields().fieldsForProvider;
    var configureProvider = configureIdentityProvider().configureProvider;
    var fullIdentityProvider = Object.assign(identityProvider, data === null || data === void 0 ? void 0 : data.identityProvider);
    useEffect(function () {
        dispatch({
            field: '*',
            value: {
                service: fullIdentityProvider.service,
                ssoUrl: fullIdentityProvider.ssoUrl,
                ssoCert: fullIdentityProvider.ssoCert,
            },
        });
        var providerDetails = fieldsForProvider(fullIdentityProvider.service);
        if (providerDetails)
            setFields(providerDetails.idpGeneratedFields);
    }, [loading]);
    var metadataUrl = fields.metadataUrl, metadataXml = fields.metadataXml, manual = fields.manual;
    return (React.createElement("div", { style: containerStyle },
        metadataXml && React.createElement(UploadComponent, __assign({}, metadataXml)),
        metadataUrl && React.createElement(InputComponent, __assign({}, metadataUrl)), (_b = manual) === null || _b === void 0 ? void 0 :
        _b.map(function (field) { return (React.createElement(InputComponent, __assign({ key: field.name, onChange: function (value) {
                return dispatch({
                    field: field.name,
                    value: value,
                });
            } }, field.inputProps, { value: state[field.name] }))); }),
        React.createElement(ButtonComponent, { onClick: function () { return configureProvider(fullIdentityProvider.id, state); } }, "Save")));
}
var HTMLButtonComponent = function (_a) {
    var children = _a.children, onClick = _a.onClick;
    return (React.createElement("button", { onClick: onClick }, children));
};
var HTMLInputComponent = function (_a) {
    var label = _a.label, onChange = _a.onChange, inputProps = __rest(_a, ["label", "onChange"]);
    return (React.createElement("label", null,
        label,
        React.createElement("input", __assign({}, inputProps, { onChange: function (event) { return onChange && onChange(event.target.value); } }))));
};
IdpGeneratedFieldsComponent.defaultProps = {
    ButtonComponent: HTMLButtonComponent,
    InputComponent: HTMLInputComponent,
    UploadComponent: HTMLInputComponent,
    containerStyle: undefined,
};

function OssoGeneratedFieldsComponent(_a) {
    var identityProvider = _a.identityProvider, InputComponent = _a.InputComponent, containerStyle = _a.containerStyle;
    var _b = useState(), fields = _b[0], setFields = _b[1];
    var _c = useProvider(identityProvider.id), data = _c.data;
    var fieldsForProvider = useOssoFields().fieldsForProvider;
    var fullIdentityProvider = Object.assign(identityProvider, data === null || data === void 0 ? void 0 : data.identityProvider);
    useEffect(function () {
        var providerDetails = fieldsForProvider(fullIdentityProvider.service);
        if (providerDetails)
            setFields(providerDetails.ossoGeneratedFields);
    }, [fullIdentityProvider.service]);
    return (React.createElement("div", { style: containerStyle }, fields === null || fields === void 0 ? void 0 : fields.map(function (field) { return (React.createElement(InputComponent, __assign({ key: field.name }, field.inputProps, { value: fullIdentityProvider[field.name] }))); })));
}
var HTMLInputComponent$1 = function (_a) {
    var label = _a.label, inputProps = __rest(_a, ["label"]);
    return (React.createElement("label", null,
        label,
        React.createElement("input", __assign({}, inputProps, { onChange: undefined }))));
};
OssoGeneratedFieldsComponent.defaultProps = {
    InputComponent: HTMLInputComponent$1,
    containerStyle: undefined,
};

export { IdpGeneratedFieldsComponent as IdpGeneratedFields, OssoContext, OssoGeneratedFieldsComponent as OssoGeneratedFields, OssoProvider, Providers, configureIdentityProvider, createEnterpriseAccount, createIdentityProvider, useEnterpriseAccount, useEnterpriseAccounts, useProvider as useIdentityProvider, useOssoFields };
//# sourceMappingURL=index.esm.js.map
