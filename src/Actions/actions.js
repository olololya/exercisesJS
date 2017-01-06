export const SEARCH_FILMS = 'SEARCH_FILMS';
export const RESET_SEARCH = 'RESET_SEARCH';

export const searchActions = {
  searchFilms: value => ({ type: SEARCH_FILMS, payload: value.toLowerCase() }),
  resetSearch: () => ({ type: RESET_SEARCH })
};
