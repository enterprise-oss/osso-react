import CSS from 'csstype';
import React, { ReactElement, useEffect, useReducer, useState } from 'react';

import { configureIdentityProvider, useIdentityProvider, useOssoFields } from '~hooks';
import parseXmlData from '~utils/metadataXmlParser';

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
  containerStyle,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  onChange: (formState: IdentityProviderFormState) => void;
  InputComponent: React.FC<OssoInputProps>;
  UploadComponent: React.FC<OssoInputProps>;
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  containerStyle?: CSS.Properties;
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

  const { metadataUrl, metadataXml, manual } = fields;

  return (
    <div style={containerStyle}>
      {metadataXml && (
        <UploadComponent
          {...(metadataXml as OssoInputProps)}
          onChange={(value) =>
            dispatch({
              field: 'metadataXml',
              value,
            })
          }
        />
      )}
      <hr style={{ margin: '24px 0' }} />
      {metadataUrl && (
        <InputComponent
          {...(metadataUrl as OssoInputProps)}
          onChange={(value) =>
            dispatch({
              field: 'metadataUrl',
              value,
            })
          }
        />
      )}
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
