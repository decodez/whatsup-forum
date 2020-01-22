import axios from 'axios';

import { SET_CURRENT_USER } from './types';

export const setCurrentUser = () => dispatch => {
  axios
    .get('/api/users/current_user')
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const logoutUser = () => dispatch => {
  axios
    .get('/api/users/logout')
    .then(res => {
      res.send('Logout Succesfull');
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const createUser = userData => dispatch => {
  axios
    .post('/api/users/signup', userData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const signinUser = userData => dispatch => {
  axios.post('/api/users/signin', userData).catch(err => {
    console.log(err);
  });
};
