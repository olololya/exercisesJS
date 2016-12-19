
const apiMiddleware = store => next => (action) => {
  if (!action.meta || action.meta.type !== 'api') return next(action);

  const createAction = (typeAct, data) => {
    let isFound;
    let arr;
    if (!data || data.length === 0) {
      arr = [];
      if (data === null) isFound = null;
      else isFound = false;
    } else {
      arr = data;
      isFound = true;
    }
    const newAction = Object.assign({}, action, {
      type: typeAct,
      payload: {
        list: arr,
        found: isFound
      }
    });
    delete newAction.meta;
    store.dispatch(newAction);
  };

  const { url } = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  fetch(url, fetchOptions)
    .then(resp => resp.json())
    .then(resp => createAction(`${action.type}_SUCCESS`, resp.response.listings))
    .catch(error => createAction(`${action.type}_FAILURE`, null));

  return true;
};

export default apiMiddleware;
