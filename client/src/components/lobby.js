import React from 'react';
import io from 'socket.io-client';

import Game from './game';
import configAPI from '../configs/api.config';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';

const API_URL = configAPI();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      status: false,
      loading: false
    }
  }

  createGame() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')),
      {transports: ['websocket']});

    this.setState({
      loading: true
    });

    socket.on('connect', () => {
      socket.emit('create_game', 'player 1 info');
      this.setState({ socket });
    });
  }

  joinGame() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')),
      {transports: ['websocket']});

    socket.on('connect', () => {
      socket.emit('join_game', 'player 2 info');
      this.setState({ socket });
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
    if (this.state.socket) {
      this.state.socket.on('start_game', gameInfo => {
        this.startGame(gameInfo);
      });
    }
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
                        <Button variant = 'dark' name = 'create' onClick = { _ => this.createGame() } >
                          Create
                        </Button>{ ' ' }
                        <Button variant = 'dark' name = 'join' onClick = { _ => this.joinGame() } >
                          Join
                        </Button>
                      </div>

                }
              </Jumbotron>
        }



      </div>
    )
  }
}

export default Lobby;
