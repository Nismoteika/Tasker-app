import * as types from '../constants/AuthTypes';

const initialState = {
  currentToken: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, currentToken: action.payload }
    case types.LOGOUT_USER:
      return {...state, currentUser: '' }
    default:
      return state;
  }
};  