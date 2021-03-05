import React from 'react';
import io from 'socket.io-client';

import './lobby.css';

import Game from '../game/game';
import configAPI from '../../configs/api.config';
import AuthService from '../../services/auth.service';
import clipboard from '../../images/clipboard.svg';

import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';

const API_URL = configAPI();


class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(),
      socket: undefined,
      status: false,
      loading: false,
      created: false,
      joined: false,
      roomId: undefined,
      copied: false,
      joiningError: false
    }
  }

  createGame() {

    const { socket, user } = this.state;

    this.setState({
      loading: true,
      created: true
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


  componentDidMount() {
    const socket = io(API_URL.slice(0, API_URL.indexOf('api/')), {transports: ['websocket']});

    socket.on('connect', _ => {
      this.setState({
        socket
      }, _ => {
        const { socket } = this.state;
        socket.on('start_game', gameInfo => {
          this.startGame(gameInfo);
        });

        socket.on('cannot_join_game', msg => {
          console.log(msg);

          this.setState({
            joiningError: msg
          })
        });

      });
    });


  }

  copyToClipBoard() {
    navigator.clipboard.writeText(this.state.socket.id);
    this.setState({
      copied: true
    })
  }

  handleClose() {
    window.location.reload();
  }

  componentWillUnmount() {
    if( this.state.socket ) {
      this.state.socket.disconnect();
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
            : <div>
                <Card className = 'text-center lobby-card'>
                  <h3>Welcome to the Lobby</h3>
                  { this.state.loading
                      ? <div>
                          <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                          </Spinner>
                          { this.state.created
                            ? <Card>
                                <Card.Header>Share your Game ID for other players to join ...</Card.Header>
                                <Card.Body>
                                  <blockquote>
                                    <OverlayTrigger
                                      placement = 'bottom'
                                      overlay = {
                                        <Tooltip id = 'button-tooltip-2'>
                                          { this.state.copied
                                              ? 'copied'
                                              : 'copy'
                                          }
                                        </Tooltip>
                                      }
                                    >
                                      {({ ref, ...triggerHandler }) => (
                                        <Button
                                          variant = 'light'
                                          {...triggerHandler}
                                          className = 'd-inline-flex align-items-center'
                                          onClick = { _ => this.copyToClipBoard() }
                                        >
                                          <span className = 'ml-1'>{ this.state.socket.id }</span>

                                          <Image
                                            ref = { ref }
                                            thumbnail
                                            src = { clipboard }
                                            margin
                                          />
                                        </Button>
                                      )}
                                    </OverlayTrigger>,
                                  </blockquote>
                                </Card.Body>
                              </Card>
                            : <div></div>
                          }
                        </div>

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
                </Card>
                <Modal show = { this.state.joiningError } onHide = { _ => this.handleClose() } >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
                      <span role = 'presentation'>
                        <p> { this.state.joiningError } </p>
                      </span>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
        }



      </div>
    )
  }
}

export default Lobby;
