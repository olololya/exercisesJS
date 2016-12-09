import { LOG_IN, LOG_OUT } from '../actions';

const initialState = { login: null };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { login: action.payload };
    case LOG_OUT:
      return { login: null };
    default:
      return state;
  }
};

export default loginReducer;
