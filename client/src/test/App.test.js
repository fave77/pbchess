import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Profile from '../components/profile/profile';
import Lobby from '../components/lobby/lobby';
import NotFound from '../components/pagenotfound/pagenotfound';
import PrivateRoute from '../components/private/private';

const renderWithWrappedRouter = ( ui, options ) => {
  return render( ui, {wrapper: Router, ...options });
}

test('renders without crashing', () => {
  renderWithWrappedRouter(<Navbar />);
  render(<Home />);
  renderWithWrappedRouter(<Login />);
  render(<Register />);
  // render(<Profile />);
  render(<Lobby />);
  render(<NotFound />);
  renderWithWrappedRouter(<PrivateRoute />);
});


