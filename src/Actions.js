import AppDispatcher from './Dispatcher';
import Constants from './Constants';

let ListStoreActions = {

  addItem(text, comment) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_ITEM,
      data: {
        text: text,
        comment: comment
      }
    })
  },

  deleteItem(item) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_ITEM,
      data: item
    })
  },

  changeStatusItem(item) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGE_STATUS,
      data: item
    })
  }
};

export default ListStoreActions;