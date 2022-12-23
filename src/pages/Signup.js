import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <input
        placeholder="Enter your Email"
        type="text"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        required
      />

      <input
        placeholder="Enter your Password"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        required
      />
      <br />

      <button disabled={isLoading}>Sign up</button>
      <br />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
