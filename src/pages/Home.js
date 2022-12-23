import { useEffect } from 'react';
import { useGratitudeContext } from '../hooks/useGratitudesContext';

// components
import GratitudeDetails from '../components/GratitudeDetails';
import GratitudeForm from '../components/GratitudeForm';
import GratitudesFooter from '../components/GratitudesFooter';
import { useUserContext } from '../hooks/useUserContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const { gratitudes, dispatch } = useGratitudeContext();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchGratitudes = async () => {
      const response = await fetch(`${BACKEND_URL}/api/gratitudes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_GRATITUDES', payload: json });
      }
    };

    // fetch the gratitudes if there's a user
    if (user) {
      fetchGratitudes();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="container">
        <GratitudeForm />

        <ul>
          {gratitudes &&
            gratitudes.map((gratitudeItem) => (
              <GratitudeDetails
                key={gratitudeItem._id}
                gratitudeItem={gratitudeItem}
              />
            ))}
        </ul>

        <GratitudesFooter />
      </div>
    </div>
  );
};

export default Home;
