import * as types from '../constants/AuthTypes';

const initialState = {
  currentToken: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, currentToken: action.payload }
    default:
      return state;
  }
};  