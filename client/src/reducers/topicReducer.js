import {
  GET_TOPICS,
  GET_MY_TOPICS,
  ADD_TOPIC,
  GET_TOPIC,
  ADD_COMMENT,
} from '../actions/types';

const initialState = {
  topics: [],
  myTopics: [],
  singleTopic: null,
  postSuccess: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    case GET_MY_TOPICS:
      return {
        ...state,
        myTopics: action.payload,
      };
    case GET_TOPIC:
      return {
        ...state,
        singleTopic: action.payload,
      };
    case ADD_TOPIC:
      return {
        ...state,
        postSuccess: true,
      };
    case ADD_COMMENT:
      return {
        ...state,
        singleTopic: action.payload,
      };
    default:
      return state;
  }
}
