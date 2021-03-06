import axios from 'axios';

import {
  ADD_TOPIC,
  GET_TOPICS,
  GET_MY_TOPICS,
  GET_TOPIC,
  ADD_COMMENT,
} from './types';

// create topic
export const addTopic = topicData => dispatch => {
  axios
    .post('/api/topics/create', topicData)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_TOPIC, payload: res.data });
    })
    .catch(err => console.log(err));
};

// create topic
export const addComment = commentData => dispatch => {
  axios
    .post('/api/topics/comment/create', commentData)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_COMMENT, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Get Topics
export const getTopics = () => dispatch => {
  axios
    .get('/api/topics/all')
    .then(res => {
      dispatch({
        type: GET_TOPICS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TOPICS,
        payload: null,
      })
    );
};

// Get My Topics
export const getMyTopics = () => dispatch => {
  axios
    .get('/api/topics/my-topics')
    .then(res => {
      dispatch({
        type: GET_MY_TOPICS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_MY_TOPICS,
        payload: null,
      })
    );
};

// Get Single Topic
export const getSingleTopic = topicData => dispatch => {
  axios
    .post('/api/topics/single', topicData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_TOPIC,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TOPIC,
        payload: null,
      })
    );
};
