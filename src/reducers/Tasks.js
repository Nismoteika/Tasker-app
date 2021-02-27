import * as types from '../constants/TasksTypes';

const initialState = {
  tasks: [],
  totalTasks: 0,
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.GET_TASKS:
      return { ...state, 
                tasks: action.payload.tasks,
                totalTasks: action.payload.totalTasks,
             }
    default:
      return state;
  }
};  