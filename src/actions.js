export const OPEN_CELL = 'OPEN_CELL';
export const GENERATE_BOMB = 'GENERATE_BOMB';
export const CHANGE_DIFF = 'CHANGE_DIFF';
export const SET_FLAG = 'SET_FLAG';
export const DEL_FLAG = 'DEL_FLAG';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const StatusGame = {
  NOSTART: 'nostart',
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose'
};

export const Difficult = {
  EASY: {
    rows: 10,
    cols: 10,
    bombs: 10
  },
  NORMAL: {
    rows: 15,
    cols: 15,
    bombs: 30
  },
  HARD: {
    rows: 20,
    cols: 20,
    bombs: 50
  }
};

export const setLogin = login => ({
  type: LOG_IN,
  payload: login
});

export const delLogin = () => ({ type: LOG_OUT });

export const openCell = id => ({
  type: OPEN_CELL,
  payload: id
});

export const setFlag = id => ({
  type: SET_FLAG,
  payload: id
});

export const delFlag = id => ({
  type: DEL_FLAG,
  payload: id
});

export const generateBombs = bombs => ({
  type: GENERATE_BOMB,
  payload: bombs
});

export const changeDifficult = name => ({
  type: CHANGE_DIFF,
  payload: name.toUpperCase()
});

export const startGame = () => ({ type: START_GAME });

export const endGame = status => ({
  type: END_GAME,
  payload: status.toUpperCase()
});
