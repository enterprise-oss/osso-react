import { OssoProvider, ProviderMap, Providers } from './index.types';
declare const providers: ProviderMap<Providers>;
declare const useOssoFields: () => {
    fieldsForProvider: (provider: Providers) => OssoProvider;
    providers: ProviderMap<Providers>;
};
export default useOssoFields;
