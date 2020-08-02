import './App.css';

import { IdpGeneratedFields, OssoGeneratedFields, useOssoFields } from '@enterprise-oss/osso';
import { Button, Card, Form, Input, Select, Tooltip, Upload } from 'antd';
import React, { useState } from 'react';

// Provide a component for text inputs rendered by Osso.
const InputComponent = ({ onChange, label, copyable, ...inputProps }) => (
  <Form.Item label={label}>
    <Input
      onChange={(e) => onChange && onChange(e.target.value)} // Osso expects a value in change handlers rather than events
      {...inputProps}
      suffix={
        copyable && (
          <Tooltip title="You should use the copyable prop to add copy-to-clipboard functionality">
            <span>COPY</span>
          </Tooltip>
        )
      }
    />
  </Form.Item>
);

// Provide a component for upload inputs rendered by Osso.
const UploadComponent = () => (
  <Upload.Dragger name="files">
    <p className="ant-upload-drag-icon"></p>
    <p className="ant-upload-text">Click to choose or drag XML Federated Metadata file</p>
    <p className="ant-upload-hint">.XML files will be parsed for configuration</p>
  </Upload.Dragger>
);

function App() {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState();
  const { providers } = useOssoFields();

  // Normally provided by GraphQL-based Osso hook, data here is mocked.
  // If you've added <OssoProvider> with an Osso deployment URI, you
  // only need to provide an object with an `id` for an identityProvider
  // to <OssoGeneratedFields> - the component will manage it's own state
  // and API calls.
  const identityProvider = {
    id: '2fdb5db6-4fcd-4872-80e2-6c59137370ef',
    service: provider,
    acsUrl: 'http://demo.ossoapp.io/auth/saml/2fdb5db6-4fcd-4872-80e2-6c59137370ef/callback',
  };
  return (
    <div className="App">
      <Card title={`Step ${step}.`} style={{ width: '100%', marginBottom: 40 }}>
        {step === 1 && (
          <>
            <p>First choose the Identity Provider service you or your customer uses for SSO.</p>
            <Form layout="vertical">
              <Form.Item>
                <Select placeholder="Choose Provider" style={{ width: 400 }} onChange={(value) => setProvider(value)}>
                  {Object.values(providers).map((provider) => (
                    <Select.Option key={provider.value} value={provider.value}>
                      {provider.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {provider && (
                <>
                  <p>
                    Based on the chosen provider, details needed to configure your app on your customer&apos;s Identity
                    Provider are shown below. A button to download appropriate documentation in PDF is also provided.
                    The copy in the component adjusts based on the scope of the user you pass to OssoProvider.
                  </p>
                  <OssoGeneratedFields InputComponent={InputComponent} identityProvider={identityProvider} />
                </>
              )}
              <Form.Item>
                {provider && (
                  <Button type="primary" htmlType="submit" onClick={() => setStep(2)}>
                    Next Step
                  </Button>
                )}
              </Form.Item>
            </Form>
          </>
        )}
        {step === 2 && (
          <>
            <p>
              Once your customer configures your app on their Identity Provider, you need to collect some data generated
              by the IDP, like an x509 cert. When this data is ready, your customer can input it directly or provide it
              to your team to input on an admin page.
            </p>
            <Form layout="vertical">
              <IdpGeneratedFields
                ButtonComponent={(props) => (
                  <Button {...props} type="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
                InputComponent={InputComponent}
                UploadComponent={UploadComponent}
                identityProvider={identityProvider}
              />
              <p>
                This step will change to match the provider used. Some IDPs support uploading an XML file, while others
                provide a URL where the XML can be accessed. Manual configuration is supported for all providers.
              </p>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}

export default App;
