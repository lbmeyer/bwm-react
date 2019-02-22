import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export const register = userData => {
  return axios.post('/api/v1/users/register', userData)
    .then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}

const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    token
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const login = userData => dispatch => {
  return axios.post('/api/v1/users/auth', userData)
    .then(res => res.data)
    .then(token => {
      // debugger;
      localStorage.setItem('auth_token', token);
      dispatch(loginSuccess(token));
    })
    .catch(error => {
      // debugger;
      dispatch(loginFailure(error.response.data.errors));
    })
}