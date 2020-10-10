import { OssoProvider } from '@enterprise-oss/osso';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

import Login from '../Login';
import SamlConfig from '../SamlConfig';

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Tabs value={location.pathname}>
          <Tab component={Link} label="SSO Login Component" to="/" value="/" />
          <Tab component={Link} label="SAML Configuration Flow" to="/config" value="/config" />
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
            <Login />
          </Route>
          <Route path="/config">
            <SamlConfig />
          </Route>
        </Switch>
      </OssoProvider>
    </>
  );
}

export default App;
