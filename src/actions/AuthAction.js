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
          document.cookie = `auth_token=${data.message.token}`;
          dispatch(loginUser(data.message.token));
        } else {
          console.log('error');
        }
      })
  }
}

export const getCookieToken = () => {
  return dispatch => {
    const token = document.cookie.match(/auth_token=(.*)[;]{0,1}/)[1];

    if (token.length > 0) {
      dispatch(loginUser(token));
    }
  }
}

const loginUser = token => ({
    type: types.LOGIN_USER,
    payload: token
})