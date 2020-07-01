import React, { ReactElement } from 'react';
import CSS from 'csstype';
import { IdentityProvider, OssoInput, OssoInputProps, OssoProviderDetails } from './index.types';

export default function OssoGeneratedFields({
  providerDetails,
  identityProvider,
  InputComponent,
  containerStyle,
}: {
  providerDetails: OssoProviderDetails;
  identityProvider: IdentityProvider;
  InputComponent: React.FC<OssoInputProps>;
  containerStyle?: CSS.Properties;
}): ReactElement {
  return (
    <div style={containerStyle}>
      {providerDetails.ossoGeneratedFields.map((field: OssoInput) => (
        <InputComponent key={field.name} {...field.inputProps} value={identityProvider[field.name]} />
      ))}
    </div>
  );
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} />
  </label>
);

OssoGeneratedFields.defaultProps = {
  InputComponent: HTMLInputComponent,
  containerStyle: undefined,
};
