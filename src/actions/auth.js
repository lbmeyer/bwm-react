import axios from 'axios';

export const register = userData => {
  return axios.post('/api/v1/users/register', userData)
    .then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}