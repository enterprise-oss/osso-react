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
import React, { useEffect, useState } from 'react';
import { useIdentityProvider, useOssoFields } from '~hooks';
export default function OssoGeneratedFieldsComponent(_a) {
    var identityProvider = _a.identityProvider, InputComponent = _a.InputComponent, containerStyle = _a.containerStyle;
    var _b = useState(), fields = _b[0], setFields = _b[1];
    var _c = useIdentityProvider(identityProvider.id), loading = _c.loading, data = _c.data;
    var fieldsForProvider = useOssoFields().fieldsForProvider;
    var fullIdentityProvider = Object.assign(identityProvider, data === null || data === void 0 ? void 0 : data.identityProvider);
    useEffect(function () {
        var providerDetails = fieldsForProvider(fullIdentityProvider.service);
        if (providerDetails)
            setFields(providerDetails.ossoGeneratedFields);
    }, [fullIdentityProvider.service]);
    return (React.createElement("div", { style: containerStyle }, fields === null || fields === void 0 ? void 0 : fields.map(function (field) { return (React.createElement(InputComponent, __assign({ key: field.name }, field.inputProps, { value: fullIdentityProvider[field.name] }))); })));
}
var HTMLInputComponent = function (_a) {
    var label = _a.label, inputProps = __rest(_a, ["label"]);
    return (React.createElement("label", null,
        label,
        React.createElement("input", __assign({}, inputProps, { onChange: undefined }))));
};
OssoGeneratedFieldsComponent.defaultProps = {
    InputComponent: HTMLInputComponent,
    containerStyle: undefined,
};
