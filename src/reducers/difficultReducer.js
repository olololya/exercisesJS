import { Difficult, CHANGE_DIFF } from '../actions';

const initialState = { currDiff: Difficult.EASY };

const difficultReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIFF:
      return { currDiff: Difficult[action.payload] };
    default:
      return state;
  }
};

export default difficultReducer;
