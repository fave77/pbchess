import React from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

import queen from '../images/wQ.svg'
import rook from '../images/wR.svg'
import bishop from '../images/wB.svg'
import knight from '../images/wN.svg'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      lastMove: undefined,
      gameOver: false,
      orientation: this.props.socket.id === this.props.roomId
        ? 'white'
        : 'black',
      turn: 'w',
      dests: {
        'a2': [ 'a3', 'a4' ],
        'b2': [ 'b3', 'b4' ],
        'c2': [ 'c3', 'c4' ],
        'd2': [ 'd3', 'd4' ],
        'e2': [ 'e3', 'e4' ],
        'f2': [ 'f3', 'f4' ],
        'g2': [ 'g3', 'g4' ],
        'h2': [ 'h3', 'h4' ],
        'b1': [ 'a3', 'c3' ],
        'g1': [ 'f3', 'h3' ]
      },
      promotion: false

    }
  }

  turnColor() {
    return this.state.turn === 'w' ? 'white' : 'black';
  }

  calcMovable() {
    return {
      free: true,
      color: this.state.orientation
    }
  }

  onMove = (from, to, promotion = 'x') => {
    this.props.socket.emit('move_piece', {
      from,
      to,
      roomId: this.props.roomId,
      promotion
    });
  }

  promotion(e) {
    this.setState({ promotion: false }, _ => {
      const { from, to } = this.state.lastMove;
      this.onMove(from, to, e);
    });
  }

  componentDidMount() {
    this.props.socket.on('move_piece', gameState => {
      const { fen, lastMove, gameOver, turn, dests } = gameState;

      console.log(lastMove)

      this.setState({
        fen,
        lastMove: lastMove !== null ? lastMove : this.state.lastMove,
        gameOver,
        turn,
        dests
      });
    });

    this.props.socket.on('promotion', pendingMove => {
      this.setState({
        promotion: true,
        lastMove: pendingMove
      });
    });

  }

  render() {
    console.log(this.state.fen, this.state.turn);
    return (

      <div style = {{ background: '#2b313c', height: '100vh' }}>
        <Col span = { 6 } />
        <Col span = { 12 } style = {{ top: '10%' }}>
          <Chessground
            turnColor = { this.turnColor() }
            movable = { this.calcMovable() }
            onMove = { this.onMove }
            style = {{ margin: 'auto' }}
            fen = { this.state.fen }
            orientation = { this.state.orientation }
          />
        </Col>
        <Col span = { 1 } />
        <Modal show = { this.state.promotion } >
          <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
            <span role = 'presentation' onClick = { () => this.promotion('q') }>
              <img src = { queen } alt = 'queen' style = {{ width: 50 }} />
            </span>
            <span role = 'presentation' onClick = { () => this.promotion('r') }>
              <img src = { rook } alt = 'rook' style = {{ width: 50 }} />
            </span>
            <span role = 'presentation' onClick = { () => this.promotion('b') }>
              <img src = { bishop } alt = 'bishop' style = {{ width: 50 }} />
            </span>
            <span role = 'presentation' onClick = { () => this.promotion('n') }>
              <img src = { knight } alt = 'knight' style = {{ width: 50 }} />
            </span>
          </div>
        </Modal>
        <Modal show = { this.state.gameOver ? true : false } >
          <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
            <span role = 'presentation'>
              <p>
                {
                  this.state.gameOver.result === 'checkmate'
                    ? this.state.orientation[0] === this.state.turn
                      ? 'Oops! You lost'
                      : 'Congrats! You won'
                    : `Game drawn by ${ this.state.gameOver.result }`
                }
              </p>
            </span>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Game;
