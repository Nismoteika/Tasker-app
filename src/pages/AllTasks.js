import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions/TaskAction';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

import TaskCard from '../components/TaskCard';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    pagination: {
        marginTop: 10,
    },
  }));

function AllTasks({ totalTasks, tasks, getTodos }) {
    const classes = useStyles();

    const [sortField, setSortField] = useState('username');
    const handleSortField = (e) => {
        setSortField(e.target.value);
    };
      
    const [sortDirection, setSortDirection] = useState('asc');
    const handleSortDirection = (e) => {
        setSortDirection(e.target.value);
    };

    const [page, setPage] = useState(1);
    const handlePage = (e, value) => {
        setPage(value);
    };

    const pageCount = parseInt(totalTasks/3)+1;

    useEffect(() => {
        getTodos({page: page, sort_field: sortField, sort_direction: sortDirection});
    }, [page, sortField, sortDirection])

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
        <Grid container>
            <Grid item>
                <h1>Total tasks: { totalTasks }</h1>
            </Grid>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <InputLabel id="sort-field-select-label">Поле для сортировки</InputLabel>
                    <Select
                    labelId="sort-field-select-label"
                    id="sort-field-select"
                    value={sortField}
                    onChange={handleSortField}
                    >
                        <MenuItem value={'username'}>username</MenuItem>
                        <MenuItem value={'email'}>email</MenuItem>
                        <MenuItem value={'status'}>status</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="sort-direction-select-label">Направление сортировки</InputLabel>
                    <Select
                    labelId="sort-direction-select-label"
                    id="sort-direction-select"
                    value={sortDirection}
                    onChange={handleSortDirection}
                    >
                        <MenuItem value={'asc'}>По возрастанию</MenuItem>
                        <MenuItem value={'desc'}>По убыванию</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
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
            <Grid item className={classes.pagination}>
                <Pagination count={pageCount} page={page} onChange={handlePage} />
            </Grid>
        </Grid>
      </main>
    );
}

const mapStateToProps = (store) => ({
    tasks: store.tasks.tasks,
    totalTasks: store.tasks.totalTasks
})

const mapDispatchToProps = (dispatch) => ({
    getTodos: (getParams) => dispatch(getTodos(getParams))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);