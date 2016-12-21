import { typesFaves } from '../Constants';

const initialState = {
  favesList: []
};

const faves = (state = initialState, action) => {
  switch (action.type) {
    case typesFaves.PUSH_ITEM:
      return {
        favesList: [
          ...state.favesList,
          action.payload
        ]
      };
    case typesFaves.DELETE_ITEM: {
      const arr = state.favesList;
      arr.splice(action.payload, 1);
      return {
        favesList: arr
      };
    }
    default: return state;
  }
};

export default faves;
