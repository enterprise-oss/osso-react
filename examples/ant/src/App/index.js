import { OssoProvider } from '@enterprise-oss/osso';
import { Layout, Menu } from 'antd';
import React from 'react';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';

import About from '../About';
import Login from '../Login';
import SamlConfig from '../SamlConfig';

const { Header, Content } = Layout;

function App() {
  const location = useLocation();

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <NavLink exact to="/">
              <span>About</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/config">
            <NavLink to="/config">
              <span> SAML Config</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/login">
            <NavLink to="/login">
              <span>SSO Login Component</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <OssoProvider
        client={{
          baseUrl: 'https://demo.ossoapp.com',
          jwt:
            'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhbUBhZG1pbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWQiOiI2YjJmYzNkMS0wYjU4LTQ0ZTYtYWZkNC04YzMzMzg4NzIxZjYiLCJvYXV0aF9jbGllbnRfaWQiOiI0MmZiMzFkOGZiYzYyYWY2MzgzN2RiNTNhNzkwOGU4MSJ9.HInHbrbtNjLykPPRZiJMOuzu3St0SSmeYoPC2fUqLVo',
        }}
      >
        <Content>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/config">
                <SamlConfig />
              </Route>
              <Route path="/auth/osso">
                <>
                  <h2>Success!</h2>
                  <p>Since this is just a front end example, we can&apos;t actually sign the user in.</p>
                  <p>
                    In a real integration, this page would be served by your server, and would initiate the OAuth flow.
                  </p>
                  <p>
                    It&apos;s essential that your users hit this endpoint on your server prior to being sent to your
                    Osso instance in order to set some session variables.
                  </p>
                </>
              </Route>
            </Switch>
          </div>
        </Content>
      </OssoProvider>
    </Layout>
  );
}

export default App;
