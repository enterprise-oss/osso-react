import React from 'react';
import { IdentityProvider, OssoInput, OssoInputProps, OssoProviderDetails } from './index.types';

export default function OssoGeneratedFields({
  providerDetails,
  samlProvider,
  InputComponent,
}: {
  providerDetails: OssoProviderDetails;
  identityProvider: IdentityProvider;
}): ReactElement {
  providerDetails.ossoGeneratedFields.map((field: OssoInput) => (
    <InputComponent key={field.name} {...field.inputProps} value={samlProvider[field.name as keyof IdentityProvider]} />
  ));
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    <input {...inputProps} />
  </label>
);

OssoGeneratedFields.defaultProps = {
  InputComponent: HTMLInputComponent,
};
