import React from 'react';
import io from 'socket.io-client';

import Game from './game';
import configAPI from '../configs/api.config';
import AuthService from '../services/auth.service';


import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL = configAPI();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(),
      socket: undefined,
      status: false,
      loading: false,
      joined: false,
      roomId: undefined

    }
  }

  createGame() {

    // on creating the game make the socket.id visible and accessible for copying
    const { socket, user } = this.state;

    this.setState({
      loading: true
    });

    socket.emit('create_game', {
      userId: user._id,
      username: user.username
    });
  }

  joinGame(e) {
    e.preventDefault();

    const { socket, user } = this.state;

    this.setState({
      loading: true
    });

    socket.emit('join_game', {
      userId: user._id,
      username: user.username,
      roomId: this.state.joined
    });
  }

  startGame = (gameInfo) => {
    console.log(gameInfo);

    this.setState({
      status: true,
      roomId: gameInfo.roomId,
      player1: gameInfo.createdBy,
      player2: gameInfo.joinedBy
    });
  }

  componentDidUpdate() {
    const { socket } = this.state;

    if (socket) {
      socket.on('start_game', gameInfo => {
        this.startGame(gameInfo);
      });

      socket.on('cannot_join_game', msg => console.log(msg));

    }
  }

  componentDidMount() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')), {transports: ['websocket']});

    socket.on('connect', _ => {
      this.setState({
        socket
      })
    });

  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  render() {
    return (
      <div>
        {
          this.state.status
            ? <Game
                roomId = { this.state.roomId }
                socket = { this.state.socket }
              />
            : <Jumbotron className = 'text-center'>
                <h3>Welcome to the Lobby</h3>
                { this.state.loading
                    ? <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    : <div>
                        { this.state.joined
                            ? <Form>
                                <Row>
                                  <Col>
                                    <Form.Control
                                      placeholder = 'Enter game ID ...'
                                      onChange = { e => this.setState({ joined: e.target.value }) }
                                    />
                                  </Col>
                                  <Col>
                                    <Button
                                      variant = 'primary'
                                      type = 'submit'
                                      onClick = { e => this.joinGame(e) }
                                     >
                                      Join
                                    </Button>
                                  </Col>
                                </Row>
                              </Form>
                            : <div>
                                <Button
                                  variant = 'dark'
                                  name = 'create'
                                  onClick = { _ => this.createGame() }
                                >
                                  Create
                                </Button>{ ' ' }
                                <Button
                                  variant = 'dark'
                                  name = 'join'
                                  onClick = { _ => { this.setState({ joined: true }) } }
                                >
                                  Join
                                </Button>
                              </div>
                        }
                      </div>

                }
              </Jumbotron>
        }



      </div>
    )
  }
}

export default Lobby;
