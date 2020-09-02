import CSS from 'csstype';
import React, { ReactElement, useEffect, useReducer, useState } from 'react';

import { configureIdentityProvider, useIdentityProvider, useOssoFields } from '~/hooks';
import parseXmlData from '~/utils/metadataXmlParser/metadataXmlParser';

import {
  IdentityProvider,
  IdentityProviderFormState,
  IdpGeneratedFieldKeys,
  IdpGeneratedFields,
  OssoButtonComponentProps,
  OssoInput,
  OssoInputProps,
  Providers,
} from './index.types';

const initialConfigState: IdentityProviderFormState = {
  service: undefined,
  ssoUrl: undefined,
  ssoCert: undefined,
};

type Action =
  | { field: keyof IdentityProviderFormState; value: string }
  | { field: 'service'; value: Providers }
  | { field: 'metadataXml'; value: string }
  | { field: 'metadataUrl'; value: string }
  | { field: '*'; value: IdentityProviderFormState };

function configReducer(state: IdentityProviderFormState, action: Action): IdentityProviderFormState {
  switch (action.field) {
    case 'service':
      return { service: action.value as Providers };
    case 'ssoCert':
      return { ...state, ssoCert: action.value };
    case 'ssoUrl':
      return { ...state, ssoUrl: action.value };
    case 'metadataXml':
      if (action.value === '') {
        return { ...state, ssoUrl: '', ssoCert: '' };
      }
      console.log('action value', action.value);
      return { ...state, ...parseXmlData(action.value) };
    case 'metadataUrl':
      // TODO: Okta and Azure block CORS, we can try to proxy, or ditch this approach
      fetch(action.value).then((response) => console.log(response.text()));
      return { ...state, ssoUrl: 'FETCHED_AND_PARSED_URL', ssoCert: 'FETCHED_AND_PARSED_CERT' };
    case '*':
      return { ...state, ...action.value };
  }
}

export default function IdpGeneratedFieldsComponent({
  identityProvider,
  onChange,
  InputComponent,
  UploadComponent,
  ButtonComponent,
  classes,
  errors,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  onChange: (formState: IdentityProviderFormState) => void;
  InputComponent: React.FC<OssoInputProps>;
  UploadComponent: React.FC<OssoInputProps>;
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  containerStyle?: CSS.Properties;
  errors?: any[];
  classes: {
    container?: string;
    formInstructions?: string;
  };
}): ReactElement | null {
  const [state, dispatch] = useReducer(configReducer, initialConfigState);
  const [fields, setFields] = useState<IdpGeneratedFields<IdpGeneratedFieldKeys>>({
    metadataUrl: undefined,
    metadataXml: undefined,
    manual: [],
  });
  const { loading, data } = useIdentityProvider(identityProvider.id);
  const { fieldsForProvider } = useOssoFields();
  const { configureProvider } = configureIdentityProvider();

  const fullIdentityProvider = Object.assign(identityProvider, data?.identityProvider) as IdentityProvider;

  useEffect(() => {
    dispatch({
      field: '*',
      value: {
        service: fullIdentityProvider.service,
        ssoUrl: fullIdentityProvider.ssoUrl,
        ssoCert: fullIdentityProvider.ssoCert,
      },
    });

    const providerDetails = fieldsForProvider(fullIdentityProvider.service);
    if (providerDetails) setFields(providerDetails.idpGeneratedFields);
  }, [loading]);

  useEffect(() => {
    onChange(state);
  }, [state]);

  const { metadataXml, manual } = fields;
  console.log(errors);
  return (
    <div className={classes?.container}>
      {metadataXml && (
        <>
          <h3 className={classes?.formInstructions}>Upload Federated Metadata XML</h3>
          <UploadComponent
            {...(metadataXml as OssoInputProps)}
            onChange={(value) =>
              dispatch({
                field: 'metadataXml',
                value,
              })
            }
          />
        </>
      )}

      <h3 className={classes.formInstructions}>Or, add configuration manually:</h3>
      {(manual as OssoInput[])?.map((field: OssoInput) => {
        return (
          <InputComponent
            key={field.name}
            onChange={(value) =>
              dispatch({
                field: field.name as keyof IdentityProviderFormState,
                value,
              })
            }
            {...field.inputProps}
            name={field.name}
            value={state[field.name as keyof IdentityProviderFormState]}
          />
        );
      })}
      <ButtonComponent onClick={() => configureProvider(fullIdentityProvider.id, state)}>Save</ButtonComponent>
    </div>
  );
}

IdpGeneratedFieldsComponent.defaultProps = {
  metadataCopy: '',
};

const HTMLButtonComponent = ({ children, onClick }: OssoButtonComponentProps) => (
  <button onClick={onClick}>{children}</button>
);

const HTMLInputComponent = ({ label, onChange, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={(event) => onChange && onChange(event.target.value)} />
  </label>
);

IdpGeneratedFieldsComponent.defaultProps = {
  ButtonComponent: HTMLButtonComponent,
  InputComponent: HTMLInputComponent,
  UploadComponent: HTMLInputComponent,
  containerStyle: undefined,
};
