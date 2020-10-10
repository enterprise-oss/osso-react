import { OssoLogin } from '@enterprise-oss/osso';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InputComponent = ({ onChange, ...props }) => (
  <TextField
    onChange={(event) => onChange(event.target.value)}
    variant="outlined"
    margin="normal"
    required
    fullWidth
    autoFocus
    {...props}
  />
);

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <OssoLogin
          containerClass={classes.form}
          ButtonComponent={(props) => (
            <Button fullWidth variant="contained" color="primary" className={classes.submit} {...props}>
              Sign In
            </Button>
          )}
          InputComponent={(props) => <InputComponent {...props} />}
          onSubmitPassword={(email, password) => {
            console.warn(`Submit a request to sign the user in to your server. Email: ${email}, Password: ${password}`);
            return Promise.resolve();
          }}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
