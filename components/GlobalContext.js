// GlobalContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const initialState = {
  people: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PEOPLE':
      return { ...state, people: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    async function fetchPeopleData() {
      try {
        const storedData = await AsyncStorage.getItem('peopleData');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          dispatch({ type: 'SET_PEOPLE', payload: parsedData });
        }
      } catch (error) {
        console.error('Error retrieving people data:', error);
      }
    }
    fetchPeopleData();
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext);
  if (!context) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
  }
  return context;
};
