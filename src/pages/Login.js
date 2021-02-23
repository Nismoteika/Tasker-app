import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import apiUrls from '../api';

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

function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const onUsernameChange = e => {
        setUsername(e.target.value);
    };
  
    const [password, setPassword] = useState('');
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const [responseData, setResponseData] = useState(null);

    const onSubmit = async e => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        let response = await fetch(apiUrls.base + 'login?developer=Nismoteika', {
          crossDomain: true,
          method: 'POST',
          mimeType: 'multipart/form-data',
          contentType: false,
          processData: false,
          dataType: "json",
          body: formData,
        });
        
        let data = await response.json();
        setResponseData(data);

        if(data.status === 'ok') {
            document.cookie = `auth_token=${data.message.token}`;
        }
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
        
        { responseData != null && responseData.status === 'ok' && 
            <Alert severity="success">Авторизация прошла успешно</Alert> 
            }
        { responseData != null && responseData.status === 'error' && 
            responseData.message.username != null && 
                <Alert severity="error">{responseData.message.username}</Alert> 
            }
        { responseData != null && responseData.status === 'error' && 
            responseData.message.password != null && 
                <Alert severity="error">{responseData.message.password}</Alert> 
            }

        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
      </Grid>
    </Grid>
    );
}
  
export default Login;