import { OssoConfig, OssoContext } from '@enterprise-oss/osso';
import { Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';

import About from '../About';
import Login from '../Login';
import SamlConfig from '../SamlConfig';

const { Header, Content } = Layout;

function App() {
  const location = useLocation();
  const { currentUser } = useContext(OssoContext);

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
          <Menu.Item key="/config-modal">
            <NavLink to="/config-modal">
              <span> SAML Config Modal</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/login">
            <NavLink to="/login">
              <span>SSO Login Component</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>

      <Content>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/config">{currentUser && <SamlConfig />}</Route>
            <Route path="/config-modal">{currentUser && <OssoConfig />}</Route>

            <Route path="/auth/osso">
              <>
                <h2>Success!</h2>
                <p>Since this is just a front end example, we can&apos;t actually sign the user in.</p>
                <p>
                  In a real integration, this page would be served by your server, and would initiate the OAuth flow.
                </p>
                <p>
                  It&apos;s essential that your users hit this endpoint on your server prior to being sent to your Osso
                  instance in order to set some session variables.
                </p>
              </>
            </Route>
          </Switch>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
