import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Jumbotron>
          <h1 className = 'text-center'> Let's play chess! </h1>
        </Jumbotron>
      </div>

    )
  }
}

export default Login;
