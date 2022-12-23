import { useState } from 'react';
import { useUserContext } from './useUserContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useUserContext();

  const signup = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // saving user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the userContext
      dispatch({ type: 'USER_LOGIN', payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
