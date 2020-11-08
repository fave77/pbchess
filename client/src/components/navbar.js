import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { currentUser, logOut } = props;
  console.log(currentUser)
  return (
    <nav className = 'navbar navbar-expand navbar-dark bg-dark'>
      <Link to = { '/' } className = 'navbar-brand'>
        pbchess
      </Link>
      <div className = 'navbar-nav mr-auto'></div>
      {currentUser ? (
        <div className = 'navbar-nav ml-auto'>
          <li className = 'nav-item'>
            <Link to={'/@'} className = 'nav-link'>
              {currentUser.username}
            </Link>
          </li>
          <li className = 'nav-item'>
            <a href = '/login' className = 'nav-link' onClick = { logOut }>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className = 'navbar-nav ml-auto'>
          <li className = 'nav-item'>
            <Link to={'/login'} className = 'nav-link'>
              Login
            </Link>
          </li>

          <li className = 'nav-item'>
            <Link to={'/register'} className = 'nav-link'>
              Register
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
