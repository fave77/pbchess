import React from 'react';
import { withRouter } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

import axios from 'axios';
import configAPI from '../../configs/api.config';

import queen from '../../images/wQ.svg'
import rook from '../../images/wR.svg'
import bishop from '../../images/wB.svg'
import knight from '../../images/wN.svg'

const API_URL = configAPI();

class AnalyzeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: undefined
    }
  }

  fetchGame(gameId) {
    return axios.post(`${API_URL}fetch-game`, { gameId });
  }

  async componentDidMount() {
    const gameId = this.props.match.params.gameId;
    const { data } = await this.fetchGame(gameId);
    this.setState({
      gameDetails: data
    });
  }

  render() {
    return (
      <div style = {{ background: '#2b313c', height: '100vh' }}>
        <Col span = { 12 } style = {{ top: '4%', margin: 'auto', width: 'fit-content' }}>
          <h1 style = {{ marginTop: '0' }}>
            PGN: { this.state.gameDetails ? this.state.gameDetails.state : 'No game'}
          </h1>
          <Chessground
            pgn = { this.state.gameDetails ? this.state.gameDetails.pgn : '' }
            orientation = { 'white' }
          />
        </Col>
      </div>
    )
  }
}

export default withRouter(AnalyzeGame);
