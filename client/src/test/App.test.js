import React from 'react';
import { render } from '@testing-library/react';

import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Profile from '../components/profile/profile';
import Lobby from '../components/lobby/lobby';
import NotFound from '../components/pagenotfound/pagenotfound';
import PrivateRoute from '../components/private/private';

test('renders without crashing', () => {
  // render(<Navbar />);
  render(<Home />);
  // render(<Login />);
  render(<Register />);
  // render(<Profile />);
  // render(<Lobby />);
  render(<NotFound />);
  // render(<PrivateRoute />);
});


