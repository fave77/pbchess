import React from 'react';
import io from 'socket.io-client';
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      server: 'http://localhost:8000/'
    };
  }

  turnColor() {
    console.log('c')
  }

  calcMovable() {
    console.log('m')
  }

  onMove = (from, to) => {
    console.log(from, to)
  }

  componentDidMount() {
    const socket = io(this.state.server);

    socket.emit('CREATE_GAME', {});
    socket.on('RECEIVE_GAME', game => {
      console.log(game.id)
    });
  }

  render() {

    return (
      <div>
        <Chessground
          turnColor={this.turnColor()}
          movable={this.calcMovable()}
          onMove={this.onMove}
          style={{ margin: "auto" }}
        />
      </div>
    )
  }
}

export default Game;
