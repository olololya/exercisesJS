import { typesList } from '../Constants';

const initialState = {
  list: [],
  isFound: true
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesList.FETCH_ITEMS_SUCCESS:
      return {
        list: action.payload.list,
        isFound: action.payload.found
      };
    case typesList.FETCH_ITEMS_FAILURE:
      return {
        list: [],
        isFound: null
      };
    default: return state;
  }
};

export default listReducer;
