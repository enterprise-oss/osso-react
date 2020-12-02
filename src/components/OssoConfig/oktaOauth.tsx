import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import React, { ReactElement, useEffect } from 'react';

import { IdentityProvider } from '~types';

export default function OktaOAuth({ identityProvider }: { identityProvider?: IdentityProvider }): ReactElement {
  useEffect(() => {
    const authClient = new OktaAuth({
      pkce: true,
      clientId: '0oa1i57d8nbqEsMJu4x7',
      issuer: 'https://dev-162024.okta.com/oauth2/default',
      redirectUri: 'http://localhost:3000/implicit/callback',
      scopes: ['openid', 'profile', 'email'],
    });

    const signIn = new OktaSignIn({ baseUrl: 'https://dev-162024.okta.com' }); // We should get a real Okta account

    // NB: Origin URLs have to be allow-listed at https://dev-162024-admin.okta.com/admin/access/api/trusted_origins
    // This means this won't really work in production.
    // We could, for our paid users, use the Okta API to set trusted origins https://developer.okta.com/docs/reference/api/trusted-origins/
    // We could also instruct OSS users to create their own Okta application to use this functionality

    signIn.renderEl(
      {
        el: '#widget-container',
      },
      function success(res: any) {
        if (res.status === 'SUCCESS') {
          // the sign in widget is fine for signing in anyone (as long as the origin url is allow-listed)
          // but only provides a sessionToken. Seems like we need to exchange the sessionToken for an
          // access token in order to actually call the API on the user's behalf. But this authClient call
          // uses an application _in our instance_ where users must be assigned. We need more of a public
          // application.
          authClient.token
            .getWithoutPrompt({ sessionToken: res.session.token })
            .then(function (res) {
              console.log(res);
              // now we can call a mutation with res.tokens.accessToken
              // to create and configure the application
            })
            .catch(function (err) {
              console.error(err);
              // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
            });
        } else {
          // The user can be in another authentication state that requires further action.
          // For more information about these states, see:
          //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
        }
      },
    );
  }, []);

  return (
    <>
      <div id="widget-container" />
    </>
  );
}
