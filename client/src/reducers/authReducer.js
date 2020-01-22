import { SET_CURRENT_USER, REGISTER_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  registerSuccess: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: true,
      };
    default:
      return state;
  }
}
