import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Learn from './components/learn/learn';
import Login from './components/login/login';
import Register from './components/register/register';
import Profile from './components/profile/profile';
import Lobby from './components/lobby/lobby';
import Confirm from './components/confirm/confirm';
import NotFound from './components/pagenotfound/page-not-found';
import Contrib from './components/contrib/contrib.js';
import { UpdatePassword, ResetPassword } from './components/password/password';
import PrivateRoute from './components/private/private';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user)
      this.setState({
        currentUser: user,
      });
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: null
    });
  }

  render() {
    return (
      <div>
        <Navbar
          currentUser = { this.state.currentUser }
          logOut = { this.logOut }
        />

        <div>
          <Switch>
            <Route exact path = '/' component = { Home } />
            <Route exact path = '/learn' component = { Learn } />
            <Route exact path = '/login' component = { Login } />
            <Route exact path = '/confirm' component = { Confirm } />
            <Route exact path = '/register' component = { Register } />
            <Route exact path = '/contributors' component = { Contrib } />
            <Route path = '/@/:profileId' component = { Profile } />
            <Route path = '/password/reset' component = { ResetPassword } />
            <PrivateRoute path = '/password/update' component = { UpdatePassword } /> 
            <PrivateRoute path = '/play' component = { Lobby } />
            <Route component = { NotFound } />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
