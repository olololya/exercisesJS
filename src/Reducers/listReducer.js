import { typesList } from '../Constants';

const initialState = {
  list: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesList.PUSH_ITEMS:
      return { list: action.payload };
    default: return state;
  }
};

export default listReducer;
