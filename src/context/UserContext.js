import { createContext, useEffect, useReducer } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { user: action.payload };
    case 'USER_LOGOUT':
      return { user: null };
    default:
      return state;
  }
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  // when there's a refresh, the useContext shows that the user is null,
  // even tho we're logged in in local storage. this is to rectify that.

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'USER_LOGIN', payload: user });
    }
  }, []);

  console.log('UserContext state', state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
