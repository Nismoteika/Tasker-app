import { push, replace } from 'connected-react-router';
import * as types from '../constants/AuthTypes';
import apiUrls from '../api';

export const userLoginFetch = user => {
  return dispatch => {
    return fetch(apiUrls.base + 'login?developer=Nismoteika', {
      crossDomain: true,
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false,
      dataType: "json",
      body: user,
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.status === 'ok') {
          document.cookie = `auth_token=${data.message.token};`;
          dispatch(loginUser(data.message.token));
          dispatch(push('/'));
        } else {
          dispatch(replace({
            pathname: '/login',
            state: { response: data.message }
          }))
        }
      })
  }
}

export const getCookieToken = () => {
  return dispatch => {
    const token = document.cookie.match(/auth_token=(.*)[;]{0,1}/);

    if (token) {
      if (token[1].length > 0) {
        dispatch(loginUser(token[1]));
      }
    }
  }
}

const loginUser = token => ({
    type: types.LOGIN_USER,
    payload: token
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})