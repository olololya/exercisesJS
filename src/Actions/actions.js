import { typesList, typesFaves } from '../Constants';

const listActions = {
  pushItems: list => ({
    type: typesList.PUSH_ITEMS,
    payload: list
  }),
  fetchItems: placeName => ({
    type: typesList.FETCH_ITEMS,
    meta: {
      type: 'api',
      url: `http://api.nestoria.co.uk/api?encoding=json&pretty=1&page=1&action=search_listings&country=uk&listing_type=buy&place_name=${placeName}`,
      method: 'GET'
    }
  })
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
