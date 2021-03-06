import { OssoProvider, ProviderMap, ProviderOption, Providers } from './index.types';
import * as allProviders from './providers';

const providerMap = Object.values(allProviders).reduce((map, provider) => {
  return { ...map, [provider.value as Providers]: provider };
}, {} as ProviderMap<Providers>);

const providers: ProviderOption[] = Object.values(allProviders).map((provider) => ({
  value: provider.value,
  iconUrl: provider.iconUrl,
  label: provider.label,
  primary: provider.primary,
  description: provider.description,
}));

const useOssoFields = (): {
  fieldsForProvider: (provider: Providers) => OssoProvider;
  providers: ProviderOption[];
} => {
  return {
    providers,
    fieldsForProvider: (provider: Providers) => providerMap[provider],
  };
};

export default useOssoFields;
