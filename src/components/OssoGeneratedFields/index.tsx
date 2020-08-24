import CSS from 'csstype';
import downloadjs from 'downloadjs';
import React, { ReactElement, useEffect, useState } from 'react';

import { useIdentityProvider, useOssoFields } from '~hooks';
import generateDocumentation from '~utils/documentationWriter';

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

  const downloadDocumentation = async () => {
    const template = await fetch('azure.pdf').then((res) => res.arrayBuffer());
    const pdf = await generateDocumentation(template, fullIdentityProvider);
    downloadjs(pdf, 'Azure ADFS setup.pdf', 'application/pdf');
  };

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
        <ButtonComponent onClick={downloadDocumentation}>Download Documentation</ButtonComponent>
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
