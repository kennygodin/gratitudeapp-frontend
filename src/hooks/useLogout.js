import { useUserContext } from './useUserContext';
import { useGratitudeContext } from './useGratitudesContext';

export const useLogout = () => {
  const { dispatch } = useUserContext();
  const { dispatch: gratitudesDispatch } = useGratitudeContext();

  const logout = () => {
    // remove user from storage.
    // We need not to send request to the db.

    localStorage.removeItem('user');

    // dispatch a logout action.
    dispatch({ type: 'USER_LOGOUT' });
    gratitudesDispatch({ type: 'SET_GRATITUDES', payload: null });
  };
  return { logout };
};
