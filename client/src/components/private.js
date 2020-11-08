import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import AuthService from '../services/auth.service';


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };
  };

  componentWillMount() {
    const user = AuthService.getCurrentUser();

    if (user)
      this.setState({
        authed: true,
      });
  }

  render() {
    const { component: Component } = this.props;
    return (
      <Route
        render = {_ => this.state.authed
          ? <Component />
          : <Redirect to = {{pathname: '/login', state: {from: this.props.location}}} />}
      />
    );
  }
}

export default PrivateRoute;
