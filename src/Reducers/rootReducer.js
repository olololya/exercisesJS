import { combineReducers } from 'redux';
import listReducer from './listReducer';
import favesReducer from './favesReducer';

const rootReducer = combineReducers({
  listReducer,
  favesReducer
});

export default rootReducer;
