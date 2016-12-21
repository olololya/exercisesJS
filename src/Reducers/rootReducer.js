import { combineReducers } from 'redux';
import list from './listReducer';
import faves from './favesReducer';
import page from './pageReducer';

const rootReducer = combineReducers({
  list,
  faves,
  page
});

export default rootReducer;
