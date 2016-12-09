import { OPEN_CELL, GENERATE_BOMB, SET_FLAG, DEL_FLAG, START_GAME } from '../actions';

const initialState = {
  openCells: [],
  bombCells: [],
  flagCells: []
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CELL:
      return {
        ...state,
        openCells: [
          ...state.openCells,
          action.payload
        ]
      };
    case SET_FLAG:
      return {
        ...state,
        flagCells: [
          ...state.flagCells,
          action.payload
        ]
      };
    case DEL_FLAG: {
      let arr = state.flagCells;
      arr = arr.slice(0, arr.indexOf(action.payload))
        .concat(arr.slice(arr.indexOf(action.payload) + 1));
      return {
        ...state,
        flagCells: arr
      };
    }
    case GENERATE_BOMB:
      return {
        ...state,
        bombCells: action.payload
      };
    case START_GAME:
      return {
        bombCells: initialState.bombCells,
        flagCells: initialState.flagCells,
        openCells: initialState.openCells
      };
    default:
      return state;
  }
};

export default boardReducer;
