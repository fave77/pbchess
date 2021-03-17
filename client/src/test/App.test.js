import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Learn from '../components/learn/learn';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Profile from '../components/profile/profile';
import Lobby from '../components/lobby/lobby';
import Game from '../components/game/game';
import User from '../components/user/user';
import NotFound from '../components/pagenotfound/page-not-found';
import PrivateRoute from '../components/private/private';

const renderWithWrappedRouter = ( ui, options ) => {
  return render( ui, {wrapper: Router, ...options });
};

test('renders without crashing', () => {
  renderWithWrappedRouter(<Navbar />);
  render(<Home />);
  render(<Footer />);
  render(<Learn />);
  renderWithWrappedRouter(<Login />);
  render(<Register />);
  renderWithWrappedRouter(<Profile />);
  render(<Lobby />);
  //render(<Game />);
  //render(<User />);
  render(<NotFound />);
  renderWithWrappedRouter(<PrivateRoute />);
});


