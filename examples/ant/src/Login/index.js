/* eslint-disable react/prop-types */
import { OssoLogin } from '@enterprise-oss/osso';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';

const InputComponent = ({ onChange, label, ...inputProps }) => (
  <Form.Item label={label}>
    <Input
      onChange={(e) => onChange && onChange(e.target.value)} // Osso expects a value in change handlers rather than events
      {...inputProps}
    />
  </Form.Item>
);

export default function Login() {
  return (
    <Card style={{ width: 400, marginBottom: 40 }} title="Sign in">
      <Form layout="vertical" component="div">
        <OssoLogin
          // NB: Osso provides a "type" prop meant to be passed to the DOM
          // as the button type (i.e. 'submit'). Ant uses the type prop to
          // refer to primary, secondary, etc. So here we grab the type prop
          // from Osso and use it as htmlType, while adding our own type prop
          // with 'primary'
          ButtonComponent={({ type, ...props }) => (
            <Button type="primary" {...props} htmlType={type}>
              Sign In
            </Button>
          )}
          InputComponent={(props) => <InputComponent {...props} />}
          onSamlFound={(email) => (window.location = `/auth/osso?email=${email}`)}
          onSubmitPassword={(email, password) => {
            console.warn(`Submit a request to sign the user in to your server. Email: ${email}, Password: ${password}`);
            return Promise.resolve();
          }}
        />
      </Form>
    </Card>
  );
}
