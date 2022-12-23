import { useContext } from 'react';
import { GratitudesContext } from '../context/GratitudeContext';

export const useGratitudeContext = () => {
  const context = useContext(GratitudesContext);

  if (!context) {
    throw Error('useGratitudeContext must be used inside a useContextProvider');
  }

  return context;
};
