import { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import TaskCard from '../components/TaskCard';

import apiUrls from '../api';

function AllTasks() {
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
                            <TaskCard objectTask={task} />
                        </Grid>
                        )
                })}
            </Grid>
        </Grid>
      </main>
    );
}
  
export default AllTasks;