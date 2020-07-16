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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useReducer, useState } from 'react';
import { configureIdentityProvider, useIdentityProvider, useOssoFields } from '~hooks';
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
export default function IdpGeneratedFieldsComponent(_a) {
    var _b;
    var identityProvider = _a.identityProvider, InputComponent = _a.InputComponent, UploadComponent = _a.UploadComponent, ButtonComponent = _a.ButtonComponent, containerStyle = _a.containerStyle;
    var _c = useReducer(configReducer, initialConfigState), state = _c[0], dispatch = _c[1];
    var _d = useState({
        metadataUrl: undefined,
        metadataXml: undefined,
        manual: [],
    }), fields = _d[0], setFields = _d[1];
    var _e = useIdentityProvider(identityProvider.id), loading = _e.loading, data = _e.data;
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
