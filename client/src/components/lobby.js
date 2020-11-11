import React from 'react';
import io from 'socket.io-client';

import Game from './game';
import configAPI from '../configs/api.config';

const API_URL = configAPI();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      status: false
    }
  }

  createGame() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')),
      {transports: ['websocket']});

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
            : <h3>Welcome to the Lobby</h3>
        }

        <button name = 'create' onClick = {() => this.createGame()} >Create</button>
        <button name = 'join' onClick = {() => this.joinGame()} >Join</button>

      </div>
    )
  }
}

export default Lobby;
