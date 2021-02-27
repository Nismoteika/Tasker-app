import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from '../reducers/Auth';
import tasks from '../reducers/Tasks';


const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    tasks
  });

export default createRootReducer;