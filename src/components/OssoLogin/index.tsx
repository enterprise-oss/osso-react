import React, { ReactElement, useEffect, useState } from 'react';

import { useOssoLogin } from '~hooks';
import { IdentityProvider, IdentityProviderStatus } from '~types';

import { OssoButtonComponentProps, OssoInputProps } from './index.types';

export default function OssoLogin({
  ButtonComponent,
  InputComponent,
  containerClass,
  submitText,
  onSubmitPassword,
  oauthEndpoint,
}: {
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  InputComponent: React.FC<OssoInputProps>;
  containerClass?: string;
  submitText: string;
  onSubmitPassword: (email: string, password: string) => Promise<void>;
  oauthEndpoint: string;
}): ReactElement {
  const [email, setEmail] = useState('');
  const [isPasswordUser, setIsPasswordUser] = useState(false);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { providerExists, data, loading, called } = useOssoLogin();

  const submitEmail = () => {
    setSubmitting(true);
    providerExists(email.split('@')[1]);
    console.log(data);
  };

  const submitPassword = () => {
    setSubmitting(true);
    onSubmitPassword(email, password);
  };

  const hasProvider = data?.enterpriseAccount?.identityProviders?.some((provider: IdentityProvider) =>
    [IdentityProviderStatus.active, IdentityProviderStatus.configured].includes(provider.status),
  );

  useEffect(() => {
    if (hasProvider) {
      window.location.assign(`${oauthEndpoint}email=${email}`);
    } else if (called) {
      setIsPasswordUser(true);
    }
  }, [data]);

  useEffect(() => {
    setSubmitting(loading);
  }, [loading, called]);

  return (
    <form
      className={containerClass}
      onSubmit={(e) => {
        e.preventDefault();
        isPasswordUser ? submitPassword() : submitEmail();
      }}
    >
      <InputComponent
        value={email}
        onChange={setEmail}
        type="text"
        label="Email"
        id="osso-email"
        autoComplete="email"
      />
      {isPasswordUser && (
        <InputComponent value={password} onChange={setPassword} type="password" label="Password" id="osso-password" />
      )}
      <ButtonComponent disabled={submitting} onClick={isPasswordUser ? submitPassword : submitEmail}>
        {submitText}
      </ButtonComponent>
    </form>
  );
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={undefined} />
  </label>
);

OssoLogin.defaultProps = {
  InputComponent: HTMLInputComponent,
  containerStyle: undefined,
  submitText: 'Submit',
  oauthEndpoint: '/auth/osso',
};
