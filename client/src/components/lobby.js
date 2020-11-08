import React from 'react';
import io from 'socket.io-client';

import Game from './game';
import configAPI from '../configs/api.config';

const API_URL = configAPI();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInfo: undefined,
      socket: undefined,
      status: false
    }
  }

  createGame() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')));

    socket.on('connect', () => {
      socket.emit('create_game', 'player A info');
      this.setState({ socket });
    });
  }

  joinGame() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')));

    socket.on('connect', () => {
      socket.emit('join_game', 'player B info');
      this.setState({ socket });
    });
  }

  startGame = (gameInfo) => {
    console.log(gameInfo);

    const { socket } = this.state;
    this.setState({ status: true, gameInfo: gameInfo  }, _ => {
      console.log(socket);
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
                gameInfo = { this.state.gameInfo }
                socket = { this.state.socket }
              />
            : <h3>Welcome to the Lobby</h3>
        }

        <button name = 'create' onClick = {() => this.createGame()} >Create</button>
        <button name = 'join' onClick = {() => this.joinGame()} >Join</button>

      </div>
    )
  }
}

export default Lobby;
