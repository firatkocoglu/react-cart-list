import React, { useContext, useReducer, useEffect } from 'react';

import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const defaultState = {
  isLoading: true,
  cart: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { isLoading, cart } = state;

  const increaseAmount = (id) => {
    dispatch({ type: 'INCREASE_AMOUNT', payload: id });
  };

  const decreaseAmount = (id) => {
    dispatch({ type: 'DECREASE_AMOUNT', payload: id });
  };

  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL' });
  };

  const clearItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const fetchData = async () => {
    fetch(url)
      .then((resp) => {
        return resp.json();
      })

      .then((phones) => {
        dispatch({ type: 'SET_CART', payload: phones });
        dispatch({ type: 'CLOSE_LOADING' });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        cart,
        removeAll,
        clearItem,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
