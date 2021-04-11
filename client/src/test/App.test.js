import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Confirm from '../components/confirm/confirm';
import Contrib from '../components/contrib/contrib.js';
import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Learn from '../components/learn/learn';
import Videos from '../components/videos/videos';
import Vocab from '../components/vocab/vocab';
import Login from '../components/login/login';
import Register from '../components/register/register';
import { UpdatePassword, ResetPassword } from '../components/password/password';
import Profile from '../components/profile/profile';
import Lobby from '../components/lobby/lobby';
import Game from '../components/game/game';
import Timer from '../components/timer/timer';
import NotFound from '../components/pagenotfound/page-not-found';
import PrivateRoute from '../components/private/private';

const renderWithWrappedRouter = ( ui, options ) => {
  return render( ui, {wrapper: Router, ...options });
};

test('renders without crashing', () => {
  render(<Confirm />);
  render(<Contrib />);
  renderWithWrappedRouter(<Navbar />);
  render(<Home />);
  render(<Footer />);
  render(<Learn />);
  render(<Videos />);
  render(<Vocab />);
  renderWithWrappedRouter(<Login />);
  render(<Register />);
  renderWithWrappedRouter(<Profile />);
  render(<UpdatePassword />);
  render(<ResetPassword />);
  render(<Lobby />);
  //render(<Game />);
  //render(<Timer />);
  render(<NotFound />);
  renderWithWrappedRouter(<PrivateRoute />);
});


