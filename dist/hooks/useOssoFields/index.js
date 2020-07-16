var _a;
import { Providers } from './index.types';
import { azure, okta } from './providers';
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
export default useOssoFields;
