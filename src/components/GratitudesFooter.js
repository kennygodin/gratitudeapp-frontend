import { useGratitudeContext } from '../hooks/useGratitudesContext';
import { useUserContext } from '../hooks/useUserContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GratitudesFooter = () => {
  const { gratitudes, dispatch } = useGratitudeContext();
  const { user } = useUserContext();

  const handleDeleteAll = async () => {
    // if there's no user, we dont even try to make request.
    if (!user) {
      return;
    }

    const response = await fetch(`${BACKEND_URL}/api/gratitudes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log('Gratitude items deleted', json);
      dispatch({ type: 'DELETE_GRATITUDES', payload: json });
    }
  };
  return (
    <div className="footer">
      {gratitudes && (
        <div>
          <p>
            <strong>
              You are grateful for {gratitudes.length} thing(s) today!
            </strong>
          </p>
        </div>
      )}

      <span onClick={handleDeleteAll}>DELETE ALL</span>
    </div>
  );
};

export default GratitudesFooter;
