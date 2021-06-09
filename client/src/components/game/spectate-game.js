import React from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

import queen from '../../images/wQ.svg'
import rook from '../../images/wR.svg'
import bishop from '../../images/wB.svg'
import knight from '../../images/wN.svg'

class SpectateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: this.props.fen,
      lastMove: undefined,
      gameOver: false,
      gameAborted: false
    }
  }

  handleClose() {
    window.location.reload();
  }

  componentDidMount() {

    this.props.socket.on('move_piece', gameState => {
      const { fen, lastMove, gameOver, turn, dests } = gameState;

      this.setState({
        fen,
        lastMove: lastMove !== null ? lastMove : this.state.lastMove,
        gameOver,
        turn,
        dests
      });
    });

    this.props.socket.on('abort_game', msg => {
      this.setState({ gameAborted: msg });
    });
  }

  render() {
    return (
      <div style = {{ background: '#2b313c', height: '100vh' }}>
        <Col span = { 6 } />
        <Col span = { 12 } style = {{ top: '4%', margin: 'auto', width: 'fit-content' }}>
          <Chessground
            fen = { this.state.fen }
            orientation = { this.props.orientation }
          />
        </Col>
        <Col span = { 1 } />
        <Modal show = { this.state.gameOver || this.state.gameAborted ? true : false } onHide = { _ => this.handleClose() } >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
              <span role = 'presentation'>
                <p>
                  {
                    this.state.gameOver.result === 'checkmate'
                      ? `${this.props.orientation} lost!`
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

export default SpectateGame;
