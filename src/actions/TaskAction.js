import * as types from '../constants/TasksTypes';
import apiUrls from '../api';
  
export const getTodos = ({ page, sort_field, sort_direction }) => {
    return dispatch => {
        fetch(`${apiUrls.base}?developer=Nismoteika&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`)
        .then((res) => res.json())
        .then((data) => {
            dispatch(getTodosAction(data.message))
        });
    };
};

const getTodosAction = todos => ({
    type: types.GET_TASKS,
    payload: {
        tasks: todos.tasks,
        totalTasks: todos.total_task_count
    }
});
