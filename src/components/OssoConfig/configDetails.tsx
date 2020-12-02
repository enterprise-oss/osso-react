import React, { ReactElement, useState } from 'react';

import { OssoGeneratedFields } from '~components';
import { IdentityProvider, OssoButtonComponentProps, OssoInputProps } from '~types';

import OktaOAuth from './oktaOauth';

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={undefined} />
  </label>
);

const HTMLButtonComponent = ({ children, onClick }: OssoButtonComponentProps) => (
  <button onClick={onClick}>{children}</button>
);

export default function ConfigDetails({
  identityProvider,
  step,
}: {
  identityProvider: IdentityProvider;
  step: number;
}): ReactElement | null {
  if (step !== 1) return null;
  let Component;

  switch (identityProvider?.service) {
    case 'OKTA':
      Component = OktaOAuth;
      break;
    default:
      Component = OssoGeneratedFields;
      break;
  }

  return (
    <Component
      ButtonComponent={HTMLButtonComponent}
      InputComponent={HTMLInputComponent}
      identityProvider={identityProvider}
    />
  );
}
