import React, { ReactElement } from 'react';

import { useOssoFields } from '~/hooks';
import { Providers } from '~/types';

const baseStyles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: 32,
    justifyItems: 'center',
    alignItems: 'center',
  },
  provider: {
    width: '128px',
    height: '128px',
    border: '1px solid #D9D9D9',
    borderRadius: '2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '0 8px',
    transition: 'all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  providerActive: { border: '2px solid #4E61A5' },
  providerLogo: { height: '72px', width: '72px' },
  providerLabel: { display: 'block', fontSize: '14px', lineHeight: '22px', marginTop: '10px', marginBottom: '8px' },
};

// TODO: this should be a shared util that takes some style variables
// to customize things

const makeStyles = (styles: any) => styles;

export default function ProviderPicker({
  provider,
  onChange,
  step,
}: {
  provider?: Providers;
  onChange?: (value: Providers) => void;
  step: number;
}): ReactElement | null {
  const { providers } = useOssoFields();
  const styles = makeStyles(baseStyles);
  if (step !== 0) return null;

  return (
    <div style={styles.root}>
      {Object.values(providers).map((providerOption) => (
        <div
          key={providerOption.value}
          style={{
            ...styles.provider,
            ...(provider === providerOption.value && styles.providerActive),
          }}
          onClick={() => onChange?.(providerOption.value)}
        >
          <img src={providerOption.iconUrl} style={styles.providerLogo} />
          <span style={styles.providerLabel}>{providerOption.label}</span>
        </div>
      ))}
    </div>
  );
}
