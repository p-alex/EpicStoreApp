const initialState = {
  isBurgerOpen: false,
  isLangOpen: false,
  searchQuery:"",
  isBrowsePage:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'searchQuery':
      return {
        ...state,
        searchQuery:action.payload
      }
      case 'setSearchQueryToEmpty':
        return {
          ...state,
          searchQuery:''
      }
      case 'isBrowsePage':
        if(action.payload.page === 'browse'){
          return {
            ...state,
            isBrowsePage: true,
            searchQuery:''
          }
        }else if(action.payload.page === 'discover'){
          return {
            ...state,
            isBrowsePage: false,
            searchQuery:''
          }
        }
        return {
          ...state,
          isBrowsePage:false,
          searchQuery:''
        }
    case 'BURGER':
      if (state.isBurgerOpen) {
        return {
          ...state,
          isBurgerOpen: false,
          isLangOpen: false,
        };
      } else {
        return {
          ...state,
          isBurgerOpen: true,
        };
      }
    case 'LANG':
      if (state.isLangOpen) {
        return {
          ...state,
          isLangOpen: false,
        };
      } else {
        return {
          ...state,
          isLangOpen: true,
        };
      }
    case 'linkClick':
      return {
        ...state,
        isBurgerOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
