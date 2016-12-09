import { StatusGame, START_GAME, END_GAME } from '../actions';

const initialState = { status: StatusGame.NOSTART };

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return { status: StatusGame.PLAYING };
    case END_GAME:
      return { status: StatusGame[action.payload] };
    default:
      return state;
  }
};

export default statusReducer;
