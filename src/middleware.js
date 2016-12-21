import 'whatwg-fetch';
import actions from './Actions/actions';

let uniqueID = 0;

const apiMiddleware = store => next => (action) => {
  if (!action.meta) return next(action);

  const createAction = (typeAction, data) => {
    let isFound = null;
    let arr = [];
    if (data !== null) {
      if (data === undefined || data.listings.length === 0) isFound = false;
      else {
        arr = data.listings.map(elem => ({ ...elem, id: (uniqueID += 1) }));
        isFound = true;
        store.dispatch(actions.page.setTotal(data.total_pages));
      }
    }

    const newAction = Object.assign({}, action, {
      type: typeAction,
      payload: {
        list: arr,
        found: isFound
      }
    });
    delete newAction.meta;
    store.dispatch(newAction);
  };

  const fetchOptions = Object.assign({}, action.meta);

  fetch(action.url, fetchOptions)
    .then(resp => resp.json())
    .then(resp => createAction(`${action.type}_SUCCESS`, resp.response))
    .catch(error => createAction(`${action.type}_FAILURE`, null));

  return true;
};

export default apiMiddleware;
