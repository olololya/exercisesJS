import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import statusReducer from './statusReducer';
import difficultReducer from './difficultReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  boardReducer,
  statusReducer,
  difficultReducer,
  loginReducer
});

export default rootReducer;
