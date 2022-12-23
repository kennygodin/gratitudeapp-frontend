import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { login, isLoading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    console.log(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

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

      <button disabled={isLoading}>Log in</button>
      <br />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
