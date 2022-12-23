import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';

const Navbar = () => {
  const navRef = useRef();

  const { logout } = useLogout();
  const { user } = useUserContext();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="navbar">
      <div className="header">
        <Link to="/">
          <img src={logo} alt="gratitude-journal-logo" />
        </Link>
      </div>

      <div ref={navRef} className="nav">
        <ul>
          {!user && (
            <div>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
            </div>
          )}

          {user && (
            <div>
              <li>
                <span>{user.email}</span>
              </li>
              <li>
                <button onClick={handleClick}>Log out</button>
              </li>
            </div>
          )}

          <button className="nav-btn nav-close-btn" onClick={showNavBar}>
            <FaTimes />
          </button>
        </ul>
      </div>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
