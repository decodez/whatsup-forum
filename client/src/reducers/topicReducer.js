import { GET_TOPICS, ADD_TOPIC, GET_TOPIC } from '../actions/types';

const initialState = {
  topics: [],
  singleTopic: null,
  postSuccess: false,
};

export default function(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
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
    default:
      return state;
  }
}
