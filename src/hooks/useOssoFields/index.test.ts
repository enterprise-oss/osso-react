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
});

describe('fieldsForProvider', () => {
  test('it returns the expected fields', () => {
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
