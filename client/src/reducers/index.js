// Root Reducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import topicReducer from './topicReducer';

export default combineReducers({
  auth: authReducer,
  topic: topicReducer,
});
