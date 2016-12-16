import { typesFaves } from '../Constants';


const initialState = {
  faves: []
};

const favesReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesFaves.PUSH_ITEM:
      return {
        faves: [
          ...state.faves,
          action.payload
        ]
      };
    case typesFaves.DELETE_ITEM: {
      const arr = state.faves;
      arr.splice(action.payload, 1);
      return {
        faves: arr
      };
    }
    default: return state;
  }
};

export default favesReducer;
