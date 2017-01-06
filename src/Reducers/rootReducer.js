import { combineReducers } from 'redux';
import { SEARCH_FILMS, RESET_SEARCH } from '../Actions/actions';

const searchInitialState = {
  films: [
    {
      id: 1,
      title: 'First film'
    }, {
      id: 2,
      title: 'Second film'
    }, {
      id: 3,
      title: '2012'
    }, {
      id: 4,
      title: '234'
    }
  ],
  searchResult: [],
  isSearch: false
};

const search = (state = searchInitialState, action) => {
  switch (action.type) {
    case SEARCH_FILMS:
      return {
        ...state,
        searchResult: state.films.filter(film =>
          film.title.toLowerCase().indexOf(action.payload) !== -1),
        isSearch: true
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchResult: [],
        isSearch: false
      };
    default: return state;
  }
};

const rootReducer = combineReducers({ search });

export default rootReducer;
