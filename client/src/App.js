import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import AuthService from './services/auth.service';

import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Game from './components/game';
import NotFound from './components/pagenotfound';

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
            <Route exact path = '/login' component = { Login } />
            <Route exact path = '/register' component = { Register } />
            <Route path = '/@' component = { Profile } />
            <Route path = '/live' component = { Game } />
            <Route component = { NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
