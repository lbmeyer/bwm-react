import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import authService from '../services/authService';

export const register = userData => {
  return axios.post('/api/v1/users/register', userData)
    .then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const checkAuthState = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
}

export const login = userData => dispatch => {
  return axios.post('/api/v1/users/auth', userData)
    .then(res => res.data)
    .then(token => {
      // debugger;
      authService.saveToken(token);
      dispatch(loginSuccess());
    })
    .catch(error => {
      // debugger;
      dispatch(loginFailure(error.response.data.errors));
    })
};

export const logout = () => {
  authService.invalidateUser();
  
  return {
    type: LOGOUT
  }
}