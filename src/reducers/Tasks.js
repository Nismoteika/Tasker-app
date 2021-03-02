import * as types from '../constants/TasksTypes';

const initialState = {
  tasks: [],
  totalTasks: 0,
  success: false,
  errors: {},
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.GET_TASKS:
      return { ...state, 
                tasks: action.payload.tasks,
                totalTasks: action.payload.totalTasks,
             }
    case types.EDIT_TASK_SUCCESS:
      return { ...state, 
                success: action.payload.success
             }
    case types.EDIT_TASK_ERROR:
      return { ...state, 
                success: false,
                errors: action.payload.errors
             }
    default:
      return state;
  }
};  