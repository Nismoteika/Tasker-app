import { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';

import GetStatus from '../components/GetStatus';
import GetAlert from '../components/GetAlert';
import { editTaskRequest } from '../actions/TaskAction';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: theme.spacing(1),
  },
  marginBot: {
    marginBottom: theme.spacing(1),
  },
  editStatus: {
    color: 'grey',
  },
  submitBtn: {
    margin: '0 auto',
  }
}));

function EditTask({ match, location, auth_token, editTaskSuccess, editTaskErrors, editTaskRequest }) {
  const classes = useStyles();

  const [taskText, setTaskText] = useState(location.state.objectTask.text);
  const onTaskTextChange = e => {
    setTaskText(e.target.value);
  };

  const [taskStatus, setTaskStatus] = useState(location.state.objectTask.status);
  const onTaskStatusChange = e => {
    setTaskStatus(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var localStatus = taskStatus;
    // task text is equal text in field || status already edited
    if (location.state.objectTask.text !== taskText
      || location.state.objectTask.status === 1
      || location.state.objectTask.status === 11) {
      if (localStatus === 0) {
        localStatus = 1;
      } else if (localStatus === 10) {
        localStatus = 11;
      }
    }

    let formData = new FormData();
    let cookie_token = document.cookie.match(/auth_token=(.*)[;]{0,1}/);
    if (cookie_token) {
      if (cookie_token[1].length > 0) {
        formData.append('token', auth_token);
      }
    }
    formData.append('text', taskText);
    formData.append('status', localStatus);

    editTaskRequest({formData: formData, idTask: match.params.id});
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item md={4}>
        <h3 style={{ textAlign: "center" }}>Редактировать задачу {match.params.id}</h3>
        <form
          onSubmit={onSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="text-task-field"
            className={classes.marginBot}
            label="Текст задачи"
            name="taskText"
            multiline
            rowsMax={4}
            value={taskText}
            onChange={onTaskTextChange}
          />
          <FormControl className={classes.marginBot}>
            <InputLabel id="task-status-select-label">Статус</InputLabel>
            <Select
              labelId="task-status-select-label"
              id="task-status-select"
              value={taskStatus}
              onChange={onTaskStatusChange}
            >
              <MenuItem value={0}>Задача не выполнена</MenuItem>
              <MenuItem value={10}>Задача выполнена</MenuItem>
            </Select>
          </FormControl>

          <Grid container justify="center" alignItems="center">
            <Grid item>
              <span>прошлое состояние:</span>
            </Grid>
            <Grid item>
              <GetStatus statusCode={location.state.objectTask.status} />
            </Grid>
          </Grid>

          <GetAlert state={editTaskErrors} />

          { editTaskSuccess &&
            <Alert severity="success" className={classes.marginBot}>Задача обновлена</Alert>
          }

          <Button type="submit" className={classes.submitBtn}  variant="contained" color="primary">
            Изменить задачу
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = store => ({
  auth_token: store.auth.currentToken,
  editTaskSuccess: store.tasks.success,
  editTaskErrors: store.tasks.errors,
});

export default connect(mapStateToProps, { push, editTaskRequest })(EditTask);