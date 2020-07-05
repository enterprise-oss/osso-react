import CSS from 'csstype';
import React, { ReactElement, useEffect, useState } from 'react';

import { useIdentityProvider, useOssoFields } from '~hooks';

import { IdentityProvider, OssoInput, OssoInputProps } from './index.types';

export default function OssoGeneratedFieldsComponent({
  identityProvider,
  InputComponent,
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  InputComponent: React.FC<OssoInputProps>;
  containerStyle?: CSS.Properties;
}): ReactElement | null {
  const [fields, setFields] = useState<OssoInput[]>();
  const { loading, data } = useIdentityProvider(identityProvider.id);
  const { fieldsForProvider } = useOssoFields();
  const fullIdentityProvider = Object.assign(identityProvider, data?.identityProvider);

  useEffect(() => {
    const providerDetails = fieldsForProvider(fullIdentityProvider.service);
    if (providerDetails) setFields(providerDetails.ossoGeneratedFields);
  }, [fullIdentityProvider.service]);

  return (
    <div style={containerStyle}>
      {fields?.map((field: OssoInput) => (
        <InputComponent key={field.name} {...field.inputProps} value={fullIdentityProvider[field.name]} />
      ))}
    </div>
  );
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={undefined} />
  </label>
);

OssoGeneratedFieldsComponent.defaultProps = {
  InputComponent: HTMLInputComponent,
  containerStyle: undefined,
};
