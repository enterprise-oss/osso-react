import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import CSS from 'csstype';
import OssoGeneratedFields from '../src/components/OssoGeneratedFields';
import useOssoFields from '../src/hooks/useOssoFields';

export default {
  title: 'Osso Generated Fields',
  component: OssoGeneratedFields,
  decorators: [withKnobs],
};

export const HTMLElements = () => {
  const { providers, fieldsForProvider } = useOssoFields();

  const label = 'Choose Identity Provider Service';
  const options = Object.keys(providers);
  const defaultValue = options[0];
  const currentValue = select(label, options, defaultValue);
  const activeIdentityProvider = providers[currentValue];

  // Provided by client side Osso hook
  const providerDetails = fieldsForProvider(activeIdentityProvider.value);

  // Normally provided by GraphQL-based Osso hook, data here is mocked
  const identityProvider = {
    id: '2fdb5db6-4fcd-4872-80e2-6c59137370ef',
    service: activeIdentityProvider.value,
    acsUrl: 'http://demo.ossoapp.io/auth/saml/2fdb5db6-4fcd-4872-80e2-6c59137370ef/callback',
  };

  return <OssoGeneratedFields providerDetails={providerDetails} identityProvider={identityProvider} />;
};

HTMLElements.story = {
  name: 'Unstyled HTML Inputs',
};

export const StyledHTMLElements = () => {
  const { providers, fieldsForProvider } = useOssoFields();

  const label = 'Choose Identity Provider Service';
  const options = Object.keys(providers);
  const defaultValue = options[0];
  const currentValue = select(label, options, defaultValue);
  const activeIdentityProvider = providers[currentValue];

  // Provided by client side Osso hook
  const providerDetails = fieldsForProvider(activeIdentityProvider.value);

  // Normally provided by GraphQL-based Osso hook, data here is mocked
  const identityProvider = {
    id: '2fdb5db6-4fcd-4872-80e2-6c59137370ef',
    service: activeIdentityProvider.value,
    acsUrl: 'http://demo.ossoapp.io/auth/saml/2fdb5db6-4fcd-4872-80e2-6c59137370ef/callback',
  };

  const containerStyle: CSS.Properties = {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: '50px',
    border: '1px solid #c7c7c7',
    borderRadius: '10px',
    padding: '24px',
  };

  return (
    <>
      <style>
        {`

        label {color: red; display: block; margin-bottom: 16px;}
        input {color: green; display: block; width: 100%; margin-top: 8px;}

        `}
      </style>
      <OssoGeneratedFields
        providerDetails={providerDetails}
        identityProvider={identityProvider}
        containerStyle={containerStyle}
      />
    </>
  );
};

StyledHTMLElements.story = {
  name: 'Styled HTML Inputs',
};
