import React from 'react';
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: this.props.gameInfo.status.fen,
      lastMove: undefined,
      msg: 'game started'
    }
  }

  turnColor() {
    console.log('c')
  }

  calcMovable() {
    console.log('m');
  }

  onMove = (from, to) => {
    this.props.socket.emit('move_piece', { from, to });
  }

  // promotion(e) {
  //   const { chess } = this
  //   const from = this.pendingMove[0]
  //   const to = this.pendingMove[1]
  //   chess.move({ from, to, promotion: e })
  //   this.setState({
  //     fen: chess.fen(),
  //     lastMove: [from, to],
  //     selectVisible: false
  //   })
  //   setTimeout(this.randomMove, 500)
  // }

  componentDidMount() {
    this.props.socket.on('move_piece', gameState => {
      const { fen, lastMove, msg } = gameState;

      this.setState({
        fen, lastMove, msg
      });
    });
  }

  render() {
    console.log(this.state.fen);
    return (
      <div>
         <Chessground
              turnColor={this.turnColor()}
              movable={this.calcMovable()}
              onMove={this.onMove}
              style={{ margin: "auto" }}
              promotion={this.promotion}
              fen = { this.state.fen }
            />

      </div>
    )
  }
}

export default Game;
