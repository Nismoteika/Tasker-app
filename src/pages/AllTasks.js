import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TaskCard from '../components/TaskCard';

import apiUrls from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
    centerBox: {
        margin: '0 auto'
    },
    bottomLine: {
        alignSelf: 'center',
        marginTop: '20px'
    }
  }));

function AllTasks() {
    const classes = useStyles();

    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState();
    useEffect(() => {
        fetch(apiUrls.base + '?developer=Nismoteika')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTasks(data.message.tasks);
            setTotalTasks(data.message.total_task_count);
            console.log(data);
        });
    }, [])

    if(tasks === []) {
        return (
            <Grid container justify="center" align="center" flexwrap="nowrap" spacing={2}>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        )
    }

    return (
      <main>
        <h1>tasks</h1>
        <Grid container direction="column" flexwrap="nowrap">
            <Grid item container spacing={2}>
                {tasks.map((task) => {
                    return (
                        <Grid item xs={12} key={task.id}>
                            <TaskCard 
                                username={task.username}
                                email={task.email}
                                text={task.text}
                                status={task.status} />
                        </Grid>
                        )
                })}
            </Grid>
        </Grid>
      </main>
    );
}
  
export default AllTasks;