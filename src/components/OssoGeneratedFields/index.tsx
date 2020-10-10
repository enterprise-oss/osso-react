import CSS from 'csstype';
import React, { ReactElement, useEffect, useState } from 'react';

import DownloadDocs from '~components/DownloadDocs';
import { useIdentityProvider, useOssoFields } from '~hooks';

import {
  IdentityProvider,
  OssoButtonComponentProps,
  OssoGeneratedFieldKeys,
  OssoGeneratedFields,
  OssoInput,
  OssoInputProps,
} from './index.types';

export default function OssoGeneratedFieldsComponent({
  identityProvider,
  ButtonComponent,
  InputComponent,
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  InputComponent: React.FC<OssoInputProps>;
  containerStyle?: CSS.Properties;
}): ReactElement | null {
  const [fields, setFields] = useState<OssoGeneratedFields<OssoGeneratedFieldKeys>>();
  const { data } = useIdentityProvider(identityProvider.id);
  const { fieldsForProvider } = useOssoFields();
  const fullIdentityProvider = Object.assign(identityProvider, data?.identityProvider);

  useEffect(() => {
    const providerDetails = fieldsForProvider(fullIdentityProvider.service);
    if (providerDetails) setFields(providerDetails.ossoGeneratedFields);
  }, [fullIdentityProvider.service]);
  console.log('render');
  return (
    <div style={containerStyle}>
      {fields?.manual?.map((field: OssoInput) => (
        <InputComponent
          key={field.inputProps.id}
          {...field.inputProps}
          value={fullIdentityProvider[field.name as keyof IdentityProvider] || ''}
        />
      ))}
      <DownloadDocs identityProvider={fullIdentityProvider} ButtonComponent={ButtonComponent} />
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
