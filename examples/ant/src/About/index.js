import { Col, Row, Typography } from 'antd';
import React from 'react';
export default function About() {
  return (
    <>
      <Row>
        <Col style={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography.Title level={3}>@enterprise-oss/osso</Typography.Title>
          <Typography.Title level={5}>
            Examples for using Osso&apos;s React components and hooks with Ant Design <br /> to integrate SAML SSO
            directly into your app
          </Typography.Title>
        </Col>
      </Row>
    </>
  );
}
