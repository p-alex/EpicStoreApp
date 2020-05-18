const initialState = {
  isBurgerOpen: false,
  isLangOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
