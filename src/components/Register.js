import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import auth from '../auth'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default class Register extends Component {

  state = {
    email: '',
    password: ''
  };

  handleChange = name => event => this.setState({[name]: event.target.value})

  render() {

    const classes = useStyles 

    const registerEmailPass = () => {

      const userData = ({email: this.state.email, password: this.state.password})
      auth.register(userData, () => this.props.history.push('/login'))
    
    }

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create una cuenta
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            // type="submit"
            onClick={ registerEmailPass }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href='/login' variant="body2">
                ¿Tenes una cuenta registrada? Logueate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  };
}