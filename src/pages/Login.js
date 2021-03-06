import { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { userLoginFetch } from '../actions/AuthAction';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        display: 'flex',
        flexFlow: 'column nowrap',
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
}));

function GetAlert({ state }) {
  var errors = [];
  if(state !== undefined) {
    if(state.response !== undefined) {
      if(state.response.username !== undefined)
        errors.push(<Alert severity="error">{ state.response.username }</Alert>);

      if(state.response.password !== undefined)
        errors.push(<Alert severity="error">{ state.response.password }</Alert>);
    }
  }
  return errors.map(item => item);
}

function Login({ userLoginFetch, location }) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const onUsernameChange = e => {
        setUsername(e.target.value);
    };
  
    const [password, setPassword] = useState('');
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        userLoginFetch(formData);
      };

    return (
        <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item md={3}>
        <h3 style={{ textAlign: "center" }}>Авторизация</h3>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          id="username-text_field"
          label="Пользователь"
          name="username"
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          id="password-text_field"
          type="password"
          label="Пароль"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />

        <GetAlert state={location.state} />

        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
      </Grid>
    </Grid>
    );
}
  
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
})

export default connect(null, mapDispatchToProps)(Login);