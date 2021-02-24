import { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

function Login(props) {
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

        props.userLoginFetch(formData);
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
          id="standard-basic"
          label="Пользователь"
          name="username"
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          id="standard-basic"
          label="Пароль"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />

        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
      </Grid>
    </Grid>
    );
}
  
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);