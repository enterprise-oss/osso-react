import { OssoProvider } from '@enterprise-oss/osso';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

import About from '../About';
import Login from '../Login';
import SamlConfig from '../SamlConfig';

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Tabs value={location.pathname}>
          <Tab component={Link} label="About" to="/" value="/" />
          <Tab component={Link} label="SAML Configuration Flow" to="/config" value="/config" />
          <Tab component={Link} label="SSO Login Component" to="/login" value="/login" />
        </Tabs>
      </AppBar>

      <OssoProvider
        client={{
          baseUrl: 'https://demo.ossoapp.com',
          jwt:
            'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhbUBhZG1pbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWQiOiI2YjJmYzNkMS0wYjU4LTQ0ZTYtYWZkNC04YzMzMzg4NzIxZjYiLCJvYXV0aF9jbGllbnRfaWQiOiI0MmZiMzFkOGZiYzYyYWY2MzgzN2RiNTNhNzkwOGU4MSJ9.HInHbrbtNjLykPPRZiJMOuzu3St0SSmeYoPC2fUqLVo',
        }}
      >
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
            <Container component="main" maxWidth="xs">
              <h2>Success!</h2>
              <p>Since this is just a front end example, we can&apos;t actually sign the user in.</p>
              <p>In a real integration, this page would be served by your server, and would initiate the OAuth flow.</p>
              <p>
                It&apos;s essential that your users hit this endpoint on your server prior to being sent to your Osso
                instance in order to set some session variables.
              </p>
            </Container>
          </Route>
        </Switch>
      </OssoProvider>
    </>
  );
}

export default App;
