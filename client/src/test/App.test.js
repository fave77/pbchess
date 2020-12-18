import React from 'react';
import { render } from '@testing-library/react';

import Navbar from '../components/navbar';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import Profile from '../components/profile';
import Lobby from '../components/lobby';
import NotFound from '../components/pagenotfound';
import PrivateRoute from '../components/private';

test('renders without crashing', () => {
  // render(<Navbar />);
  render(<Home />);
  render(<Login />);
  render(<Register />);
  // render(<Profile />);
  // render(<Lobby />);
  render(<NotFound />);
  // render(<PrivateRoute />);
});


