import { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import GetAlert from '../components/GetAlert';
import { addTaskRequest } from '../actions/TaskAction';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  marginBot: {
    marginBottom: theme.spacing(1),
  },
  submitBtn: {
    margin: '0 auto',
  }
}));

function AddTask({ taskSuccess, taskErrors, addTaskRequest }) {
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

  const onSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('text', text);

    addTaskRequest({ formData });
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item md={4}>
        <h3 style={{ textAlign: "center" }}>Новая задача</h3>
        <form
          onSubmit={onSubmit}
          className={classes.form}
          autoComplete="off"
        >
          <TextField
            id="username-add-task-field"
            className={classes.marginBot}
            label="Пользователь"
            name="username"
            value={username}
            required
            onChange={onUsernameChange}
          />
          <TextField
            id="email-add-task-field"
            className={classes.marginBot}
            label="E-mail"
            type="email"
            name="email"
            required
            value={email}

            onChange={onEmailChange}
          />
          <TextField
            id="text-add-task-field"
            label="Текст задачи"
            className={classes.marginBot}
            name="text"
            multiline
            rowsMax={4}
            value={text}
            required
            onChange={onTextChange}
          />

          <GetAlert state={taskErrors} />

          { taskSuccess &&
            <Alert severity="success" className={classes.marginBot}>Задача обновлена</Alert>
          }

          <Button type="submit" variant="contained" color="primary" className={classes.submitBtn}>
            Добавить
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = store => ({
  taskSuccess: store.tasks.success,
  taskErrors: store.tasks.errors,
})

export default connect(mapStateToProps, { addTaskRequest })(AddTask);