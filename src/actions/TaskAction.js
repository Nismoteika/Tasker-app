import * as types from '../constants/TasksTypes';
import { push } from 'connected-react-router';
import apiUrls from '../api';
  
export const getTasks = ({ page, sort_field, sort_direction }) => {
    return dispatch => {
        fetch(`${apiUrls.base}?developer=Nismoteika&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`)
        .then((res) => res.json())
        .then((data) => {
            dispatch(getTasksAction(data.message))
        });
    };
};

export const editTaskRequest = ({formData, idTask}) => {
    return dispatch => {
        fetch(`${apiUrls.base}edit/${idTask}?developer=Nismoteika`, {
            crossDomain: true,
            method: 'POST',
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            dataType: "json",
            body: formData,
        })
        .then(res => res.json())
        .then((data) => {
            if (data.status === 'ok') {
                dispatch(taskErrorAction(null));
                dispatch(taskSuccessAction(true));
                setTimeout(() => {
                    dispatch(taskSuccessAction(false));
                    dispatch(push('/'));
                }, 1500);
            } else {
                dispatch(taskErrorAction(data.message));
                setTimeout(() => {
                    dispatch(push('/login'));
                    dispatch(taskErrorAction(null));
                }, 1500);
            }
        });
    };
};

const getTasksAction = tasks => ({
    type: types.GET_TASKS,
    payload: {
        tasks: tasks.tasks,
        totalTasks: tasks.total_task_count
    }
});

const taskSuccessAction = (success) => ({
    type: types.EDIT_TASK_SUCCESS,
    payload: {
        success,
    }
});

const taskErrorAction = errors => ({
    type: types.EDIT_TASK_ERROR,
    payload: {
        errors,
    }
});
