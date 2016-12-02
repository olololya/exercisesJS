import AppDispatcher from './Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import Constants from './Constants';

let items = [{
  text: 'Add new item',
  state: false,
  comment: ''
}];

let ListStore = assign({}, EventEmitter.prototype, {

  getItems() {
    return items;
  },
  
  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeChangeListener('change', callback);
  }
});

AppDispatcher.register((payload) => {
  let id;
  switch(payload.actionType) {
    case Constants.ADD_ITEM:
      for (let i = 0; i < items.length; i++) {
        if (items[i].text == payload.data.text) {
          alert('This Item is already there');
          return;
        }
      }
      items.push({
        text: payload.data.text,
        comment: payload.data.comment,
        status: false
      });
      break;
    case Constants.DELETE_ITEM:
      id = getItemID(payload.data);
      if (id != 'false') items.splice(id, 1);
      break;
    case Constants.CHANGE_STATUS:
      id = getItemID(payload.data);
      if (id != 'false') items[id].state = !items[id].state;
      break;
    default:
      return true;
  }

  ListStore.emitChange();
  return true;
});

function getItemID(item) {
  for (let i = 0; i < items.length; i++) {
    let flag = true;
    for (let key in items[i]) {
      if (items[i][key] != item[key]) {
        flag = false;
        break;
      }
    }
    if (flag) return i;
  }
  return false;
}

export default ListStore;
