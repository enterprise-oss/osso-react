/* eslint-disable react/prop-types */
import './App.css';

import { DownloadOutlined } from '@ant-design/icons';
import {
  createIdentityProvider,
  IdpGeneratedFields,
  OssoGeneratedFields,
  useEnterpriseAccount,
  useOssoFields,
} from '@enterprise-oss/osso';
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

// Provide a component for text inputs rendered by Osso.
const ButtonComponent = ({ children, onClick }) => {
  return (
    <Button type="ghost" onClick={onClick} icon={<DownloadOutlined />}>
      {children}
    </Button>
  );
};

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
  const { data } = useEnterpriseAccount('example.com');

  const { createProvider, data: idpData } = createIdentityProvider();
  const identityProvider = idpData?.createIdentityProvider?.identityProvider;

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
              <Form.Item>
                {provider && (
                  <>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        createProvider(data?.enterpriseAccount.id, provider).then(() => {
                          setStep(2);
                        });
                      }}
                    >
                      Next Step
                    </Button>
                  </>
                )}
              </Form.Item>
            </Form>
          </>
        )}
        {step === 2 && (
          <>
            <p>
              After choosing the Identity Provider service your customer uses, you can create an IdentityProvider
              instance in Osso. Osso generates the data that is required for your customer to configure your app in
              their IDP, as well as IDP specific PDF documentation for your customer to follow.
            </p>
            <OssoGeneratedFields
              ButtonComponent={ButtonComponent}
              InputComponent={InputComponent}
              identityProvider={identityProvider}
            />
          </>
        )}
        {step === 3 && (
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
                classes={{}}
                onChange={() => {}}
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
