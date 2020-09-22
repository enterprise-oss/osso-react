import './index.css';
import 'antd/dist/antd.css';

import { OssoProvider } from '@enterprise-oss/osso';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <OssoProvider
    client={{
      cors: 'include',
      baseUrl: 'http://localhost:9292',
      jwt:
        'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhbUBhZG1pbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWQiOiI2YjJmYzNkMS0wYjU4LTQ0ZTYtYWZkNC04YzMzMzg4NzIxZjYiLCJvYXV0aF9jbGllbnRfaWQiOiI0MmZiMzFkOGZiYzYyYWY2MzgzN2RiNTNhNzkwOGU4MSJ9.HInHbrbtNjLykPPRZiJMOuzu3St0SSmeYoPC2fUqLVo',
    }}
  >
    <App />
  </OssoProvider>,
  document.getElementById('root'),
);
