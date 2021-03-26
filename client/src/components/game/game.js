import React from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import User from '../user/user';

import queen from '../../images/wQ.svg'
import rook from '../../images/wR.svg'
import bishop from '../../images/wB.svg'
import knight from '../../images/wN.svg'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      lastMove: undefined,
      gameOver: false,
      orientation: this.props.socket.id === this.props.gameId
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
      promotion: false,
      gameAborted: false
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
      gameId: this.props.gameId,
      promotion
    });
  }

  onTimeOut= (player) => {
    this.setState({ 
      gameAborted: `${player.username === this.props.self.username ? 'You' : player.username} timed out !!`
    });
    this.props.socket.emit('timeout', {
      gameId: this.props.gameId,
      player
    });
  }

  promotion(e) {
    this.setState({ promotion: false }, _ => {
      const { from, to } = this.state.lastMove;
      this.onMove(from, to, e);
    });
  }

  handleClose() {
    window.location.reload();
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

    this.props.socket.on('timed_out', data => {
      const {result, timedoutPlayer} = data;
      this.setState({ 
        gameAborted: `${timedoutPlayer.username === this.props.self.username ? 'You' : timedoutPlayer.username} timed out !!`
      });
    });

    this.props.socket.on('abort_game', msg => {
      this.setState({ gameAborted: msg });
    });

  }

  render() {
    console.log(this.state.fen, this.state.turn);
    return (
      <div style = {{ background: '#2b313c', height: '100vh' }}>
        <Col span = { 6 } />
        <Col span = { 12 } style = {{ top: '4%', margin: 'auto', width: 'fit-content' }}>
            Category: {this.props.timerDetails.category} Total time of game: {this.props.timerDetails.totalTime}
            <User
              player={this.props.opponent}
              turn={this.state.turn !== this.state.orientation.charAt(0)}
            />
            <button onClick={event => this.onTimeOut(this.props.opponent)}>Timeout</button>
            <Chessground
              turnColor = { this.turnColor() }
              movable = { this.calcMovable() }
              onMove = { this.onMove }
              fen = { this.state.fen }
              orientation = { this.state.orientation }
            />
            <button onClick={event => this.onTimeOut(this.props.self)}>Timeout p2</button>
            <User
              player={this.props.self}
              turn={this.state.turn === this.state.orientation.charAt(0)}
            />
        </Col>
        <Col span = { 1 } />
        <Modal show = { this.state.promotion } >
          <Modal.Body>
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
          </Modal.Body>
        </Modal>
        <Modal show = { this.state.gameOver || this.state.gameAborted ? true : false } onHide = { _ => this.handleClose() } >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
              <span role = 'presentation'>
                <p>
                  {
                    this.state.gameOver.result === 'checkmate'
                      ? this.state.orientation[0] === this.state.turn
                        ? 'Oops! You lost'
                        : 'Congrats! You won'
                      : this.state.gameAborted
                          ? this.state.gameAborted
                          : `Game drawn by ${ this.state.gameOver.result }`
                  }
                </p>
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Game;
