import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              @enterprise-oss/osso
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Examples for using Osso&apos;s React components and hooks with Material UI <br /> to integrate SAML SSO
              directly into your app
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button href="https://github.com/enterprise-oss/osso-react" variant="contained" color="primary">
                    Github
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    href="https://ossoapp.com/docs/integration/self-serve-osso-react"
                    variant="outlined"
                    color="primary"
                  >
                    Documentation
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <p>
            Osso&apos;s React library offers two integration points for making your user&apos;s SSO experience seamless:{' '}
            <strong>SAML Configuration</strong> and <strong>SSO Login</strong>.
          </p>
          <p>
            Neither of thisese integrations are strictly necessary to use Osso to sign SSO users into your application.
          </p>
          <hr />
          <h2>SAML Configuration</h2>
          <p>When onboarding a customer who wishes to use SSO, a multi-step configuration process must be performed:</p>

          <ol>
            <li>
              Osso requires that an Identity Provider gets configured with the Identity Provider service and the domain
              of the customer&apos;s email address.
            </li>
            <li>
              Osso then generates some data that you customer must enter in their Identity Provider dashboard. Osso
              generates a PDF document with instructions on how to set up your app that includes this data.
            </li>
            <li>
              Your customer follows the integration docs in their Identtity Provider. The Identity Provider will then
              generate some additional data. This data must be added to Osso in order for users from this IDP to start
              signing in.
            </li>
          </ol>
          <p>
            This configuration process can be performed in Osso&apos;s Admin UI, where your team handles steps 1 and 3
            of configuration, providing the integration document to your customer to perform step 2.
          </p>
          <p>
            You can also integrate this mutlistep process into your own React application. This way your customers can
            complete steps 1 through 3 themselves, reducing the workload on your team, and getting the configuration
            process done more quickly.
          </p>
          <p>
            Osso recommends first onboarding some SSO customers manually using the Admin UI. Once your team is
            comfortable with the process and the issues that may arise, then implement self-serve SAML config in your
            own application as seen in the <Link to="/config">SAML Configuration Example</Link>.
          </p>
          <hr />
          <h2>SSO Login</h2>
          <p>
            Once you onboard some customers, they are ready to sign in to your app. Most IDPs offer a dashboard where
            users can access all of their apps directly - this is known as an Identity Provider Initiated sign in.
          </p>
          <p>
            For the best user experience, Osso recommends giving these users a way to sign in to your application when
            they visit your homepage. There are a few ways to accomplish this - read our guide on{' '}
            <a href="https://ossoapp.com/guides/sso-ux">SSO UX</a> and review it with you product and design teammates
            to determine how you want approach this challenge.
          </p>
          <p>
            Osso offers a login component that supports signing in SSO users via Osso, while gracefully falling back to
            an Email / Password based sign in if an Identity Provider is not configured for the submitted email
            address&apos;s domain.
          </p>
          <p>
            See the <Link to="/login">SSO Login Example</Link>. Sign in with an email address with{' '}
            <code>example.com</code> in order to see the expereince for an SSO user. Any other email address will fall
            back to password based login.
          </p>
        </Container>
      </main>
    </React.Fragment>
  );
}
