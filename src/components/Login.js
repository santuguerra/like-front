import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import auth from '../auth';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    errorMessage: ''
  };

  handleChange = name => event => this.setState({[name]: event.target.value})

  render() {
    const classes = useStyles

    const login = () => {
      auth.login(() => {
        this.setState({ doRedirect: true });
      })
    }

    const loginEmail = async () => {

      console.log("login")

      const userData = {email: this.state.email, password: this.state.password}
      await auth.login(userData, 
        () => this.props.history.push('/'), 
        errorMessage => this.setState({errorMessage: errorMessage}))

    }

    return (
    <Container component="main" maxWidth="xs">
      { auth.isAuthenticated() && this.state.doRedirect && <Redirect to="/" /> }
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Logueate
        </Typography>
        <form className={classes.form} onSubmit={()=> login(this.setState)} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          { this.state.errorMessage !== '' ? <p>{ this.state.errorMessage }</p> : '' }
          <Button 
            //type="submit"
            onClick={loginEmail}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Logueate
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href='/register' variant="body2">
                {"¿No tenes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  }
}