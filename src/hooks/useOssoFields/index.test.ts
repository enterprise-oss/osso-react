import { renderHook } from '@testing-library/react-hooks';

import useOssoFields from './index';

describe('providers', () => {
  test('contains an array of Identity Providers in the tuple', () => {
    const {
      result: {
        current: { providers },
      },
    } = renderHook(() => useOssoFields());

    expect(providers).toMatchSnapshot();
  });

  test('each Identity Provider has a label, value, and icon', () => {
    const {
      result: {
        current: { providers },
      },
    } = renderHook(() => useOssoFields());

    providers.map((provider) => {
      expect(Object.keys(provider).sort).toEqual(['value', 'label', 'icon'].sort);
    });
  });
});

describe('fieldsForProvider', () => {
  test('it returns the expected fields for each provider', () => {
    const {
      result: {
        current: { providers, fieldsForProvider },
      },
    } = renderHook(() => useOssoFields());

    providers.map((providerOption) => {
      const result = fieldsForProvider(providerOption.value);
      expect(result).toMatchSnapshot();
    });
  });
});
