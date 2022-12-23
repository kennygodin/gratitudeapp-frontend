import { FaTrash } from 'react-icons/fa';
import { useGratitudeContext } from '../hooks/useGratitudesContext';
import { useUserContext } from '../hooks/useUserContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GratitudeDetails = ({ gratitudeItem }) => {
  const { dispatch } = useGratitudeContext();
  const { user } = useUserContext();

  const handleClick = async () => {
    // if there's no user, we dont even try to make request.
    if (!user) {
      return;
    }
    const response = await fetch(
      `${BACKEND_URL}/api/gratitudes/${gratitudeItem._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_GRATITUDE', payload: json });
    }
  };

  return (
    <li>
      {gratitudeItem.content}
      <div className="del" onClick={handleClick}>
        <FaTrash />
      </div>
    </li>
  );
};

export default GratitudeDetails;
