import { typesList, typesFaves } from '../Constants';

const listActions = {
  pushItems: list => ({ type: typesList.PUSH_ITEMS, payload: list })
};

const favesActions = {
  pushItem: item => ({ type: typesFaves.PUSH_ITEM, payload: item }),
  deleteItem: id => ({ type: typesFaves.DELETE_ITEM, payload: id })
};


const actions = {
  list: listActions,
  faves: favesActions
};

export default actions;
