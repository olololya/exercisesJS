import { typesPage } from '../Constants';

const initialState = {
  currentPage: 1,
  totalPages: 0
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case typesPage.RESET_PAGE:
      return initialState;
    case typesPage.SET_TOTAL:
      return {
        ...state,
        totalPages: action.payload
      };
    case typesPage.GO_NEXT:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case typesPage.GO_PREV:
      return {
        ...state,
        currentPage: state.currentPage - 1
      };
    case typesPage.GO_SPECIAL:
      return {
        ...state,
        currentPage: action.payload
      };
    default: return state;
  }
};

export default page;
