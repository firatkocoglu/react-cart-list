const reducer = (state, action) => {
  if (action.type === 'CLOSE_LOADING') {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === 'SET_CART') {
    return {
      ...state,
      cart: action.payload,
    };
  }
  if (action.type === 'REMOVE_ALL') {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const filteredItems = state.cart.filter((item) => {
      return item.id !== action.payload;
    });
    return {
      ...state,
      cart: filteredItems,
    };
  }
  if (action.type === 'INCREASE_AMOUNT') {
    const filteredItem = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return {
      ...state,
      cart: filteredItem,
    };
  }
  if (action.type === 'DECREASE_AMOUNT') {
    const filteredItem = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    return {
      ...state,
      cart: filteredItem,
    };
  }

  throw new Error('no matching action type');
};

export default reducer;
