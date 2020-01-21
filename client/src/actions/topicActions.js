import axios from 'axios';

import { ADD_TOPIC, GET_TOPICS, GET_TOPIC } from './types';

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
