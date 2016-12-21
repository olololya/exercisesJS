import { typesList, typesFaves, typesPage } from '../Constants';

const listActions = {
  fetchItems: (placeName, page = 1) => ({
    type: typesList.FETCH_ITEMS,
    url: `http://api.nestoria.co.uk/api?encoding=json&pretty=1&page=${page}&action=search_listings&country=uk&listing_type=buy&place_name=${placeName}`,
    meta: { method: 'GET' }
  }),
  reset: () => ({ type: typesList.RESET })
};

const favesActions = {
  pushItem: item => ({ type: typesFaves.PUSH_ITEM, payload: item }),
  deleteItem: id => ({ type: typesFaves.DELETE_ITEM, payload: id })
};

const pageActions = {
  setTotal: total => ({ type: typesPage.SET_TOTAL, payload: total }),
  resetPage: () => ({ type: typesPage.RESET_PAGE }),
  goNextPage: () => ({ type: typesPage.GO_NEXT }),
  goPrevPage: () => ({ type: typesPage.GO_PREV }),
  goSpecialPage: page => ({ type: typesPage.GO_SPECIAL, payload: page })
};

const actions = {
  list: listActions,
  faves: favesActions,
  page: pageActions
};

export default actions;
