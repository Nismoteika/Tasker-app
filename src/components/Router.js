import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import AllTasks from '../pages/AllTasks';
import AddTask from '../pages/AddTask';

const useStyles = makeStyles({
    root: {
        margin: '15px 0'
      },
})

function Router() {
    const classes = useStyles();

    return (
        <main className={classes.root}>
        <Container maxWidth="md">
        <Switch>
            <Route exact path="/" component={AllTasks} />

            <Route exact path="/task/add" component={AddTask} />
            {/* <Route exact path="/task/edit" component={AllTasks} /> */}

            <Route component={AllTasks} /> 
        </Switch>
        </Container>
        </main>
    );
}
  
export default Router;
  