import React, { ReactElement, useEffect, useState } from 'react';

import { useOssoLogin } from '~hooks';

import { OssoButtonComponentProps, OssoInputProps } from './index.types';

export default function OssoLogin({
  ButtonComponent,
  InputComponent,
  containerClass,
  submitText,
  onSamlFound,
  onSubmitPassword,
}: {
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  InputComponent: React.FC<OssoInputProps>;
  containerClass?: string;
  submitText: string;
  onSamlFound: (email: string) => Promise<void>;
  onSubmitPassword: (email: string, password: string) => Promise<void>;
}): ReactElement {
  const [email, setEmail] = useState('');
  const [isPasswordUser, setIsPasswordUser] = useState(false);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { providerExists, loading, called } = useOssoLogin();

  const submitEmail = async () => {
    setSubmitting(true);
    const hasProvider = await providerExists(email.split('@')[1]);

    if (hasProvider) {
      onSamlFound(email);
    } else if (called) {
      setSubmitting(false);
      setIsPasswordUser(true);
    }
  };

  const submitPassword = () => {
    setSubmitting(true);
    onSubmitPassword(email, password).finally(() => {
      setSubmitting(false);
    });
  };

  useEffect(() => {
    setSubmitting(called && loading);
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
        type="email"
        label="Email"
        id="osso-email"
        autoComplete="email"
        required={true}
      />
      {isPasswordUser && (
        <InputComponent value={password} onChange={setPassword} type="password" label="Password" id="osso-password" />
      )}
      <ButtonComponent type="submit" disabled={submitting}>
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
};
