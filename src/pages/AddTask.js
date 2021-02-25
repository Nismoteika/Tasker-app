import { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

function AddTask({ push }) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const onUsernameChange = e => {
        setUsername(e.target.value);
    };
  
    const [email, setEmail] = useState('');
    const onEmailChange = e => {
        setEmail(e.target.value);
    };
  
    const [text, setText] = useState('');
    const onTextChange = e => {
        setText(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('text', text);

        let response = await fetch(apiUrls.base + 'create?developer=Nismoteika', {
          crossDomain: true,
          method: 'POST',
          mimeType: 'multipart/form-data',
          contentType: false,
          processData: false,
          dataType: "json",
          body: formData,
        });
    
        let result = await response.json();
        if(result.status === 'ok') {
          push('/');
        } else {
          console.log('error');
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
        <h3 style={{ textAlign: "center" }}>Новая задача</h3>
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
          label="E-mail"
          name="email"
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          id="standard-basic"
          label="Текст задачи"
          name="action"
          value={text}
          onChange={onTextChange}
        />

        <Button type="submit" variant="contained" color="primary">
          Добавить
        </Button>
      </form>
      </Grid>
    </Grid>
    );
}
  
export default connect(null, { push })(AddTask);