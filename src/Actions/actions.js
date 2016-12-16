export const types = {
  PUSH_ITEMS: 'PUSH_ITEMS'
};

export const pushItems = list => ({
  type: types.PUSH_ITEMS,
  payload: list
});
