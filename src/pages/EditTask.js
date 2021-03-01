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

function EditTask({ match, location, auth_token, push }) {
  const classes = useStyles();

  const [taskText, setTaskText] = useState(location.state.objectTask.text);
  const onTaskTextChange = e => {
    setTaskText(e.target.value);
  };

  const [taskStatus, setTaskStatus] = useState(location.state.objectTask.status);
  const onTaskStatusChange = e => {
    setTaskStatus(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('token', auth_token);
    formData.append('text', taskText);
    formData.append('status', taskStatus);

    let response = await fetch(`${apiUrls.base}edit/${match.params.id}?developer=Nismoteika`, {
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
        <h3 style={{ textAlign: "center" }}>Редактировать задачу { match.params.id }</h3>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >

          <TextField
            id="standard-basic"
            label="Текст задачи"
            name="taskText"
            multiline
            rowsMax={4}
            value={taskText}
            onChange={onTaskTextChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="task-status-select-label">Статус</InputLabel>
            <Select
              labelId="task-status-select-label"
              id="task-status-select"
              value={taskStatus}
              onChange={onTaskStatusChange}
            >
              <MenuItem value={0}>Задача не выполнена</MenuItem>
              <MenuItem value={1}>Задача не выполнена, отредактирована админом</MenuItem>
              <MenuItem value={10}>Задача выполнена</MenuItem>
              <MenuItem value={11}>Задача отредактирована админом и выполнена</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Изменить задачу
        </Button>
        </form>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = store => ({
  auth_token: store.auth.currentToken
});

export default connect(mapStateToProps, { push })(EditTask);