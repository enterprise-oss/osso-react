import CSS from 'csstype';
import React, { ReactElement, useEffect, useState } from 'react';

import { useIdentityProvider, useOssoFields } from '~hooks';

import {
  IdentityProvider,
  OssoGeneratedFieldKeys,
  OssoGeneratedFields,
  OssoInput,
  OssoInputProps,
  OssoLinkComponentProps,
} from './index.types';

export default function OssoGeneratedFieldsComponent({
  identityProvider,
  LinkComponent,
  InputComponent,
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  LinkComponent: React.FC<OssoLinkComponentProps>;
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

  return (
    <div style={containerStyle}>
      {fields?.manual?.map((field: OssoInput) => (
        <InputComponent
          key={field.name}
          {...field.inputProps}
          value={fullIdentityProvider[field.name as keyof IdentityProvider]}
        />
      ))}
      {fields?.documentationPdfUrl && (
        <LinkComponent {...fields?.documentationPdfUrl} href={fullIdentityProvider.documentationPdfUrl}>
          Download Documentation
        </LinkComponent>
      )}
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
