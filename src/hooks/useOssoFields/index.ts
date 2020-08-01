import { OssoProvider, ProviderMap, Providers } from './index.types';
import * as allProviders from './providers';

const providerMap = Object.entries(allProviders).reduce((map, [_key, provider]) => {
  return { ...map, [provider.value as Providers]: provider };
}, {} as ProviderMap<Providers>);

type ProviderOption = {
  value: Providers;
  label: string;
  icon: string;
};

const providers: ProviderOption[] = Object.values(allProviders).map((provider) => ({
  value: provider.value,
  icon: provider.icon,
  label: provider.label,
}));

const useOssoFields = (): {
  fieldsForProvider: (provider: Providers) => OssoProvider;
  providers: ProviderOption[];
} => {
  const fieldsForProvider = (provider: Providers) => {
    console.log(providerMap);
    return providerMap[provider];
  };

  return {
    providers,
    fieldsForProvider,
  };
};

export default useOssoFields;
