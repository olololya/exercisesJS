import { types } from '../Actions/actions';

const initialState = {
  list: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUSH_ITEMS:
      return { list: action.payload };
    default: return state;
  }
};

export default rootReducer;
