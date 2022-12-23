import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGratitudeContext } from '../hooks/useGratitudesContext';
import { useUserContext } from '../hooks/useUserContext';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GratitudeForm = () => {
  const { dispatch } = useGratitudeContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const { user } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const gratitude = { content };

    const response = await fetch(`${BACKEND_URL}/api/gratitudes`, {
      method: 'POST',
      body: JSON.stringify(gratitude),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setContent('');
      console.log('New gratitude item added', json);
      dispatch({ type: 'CREATE_GRATITUDE', payload: json });
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What are you grateful for today?"
      />
      <button>
        <FaPlus />
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default GratitudeForm;
