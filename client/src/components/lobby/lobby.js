import React from 'react';
import io from 'socket.io-client';

import './lobby.css';

import Game from '../game/game';
import configAPI from '../../configs/api.config';
import AuthService from '../../services/auth.service';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import CreateGame from './create-game';
import JoinGame from './join-game';

const API_URL = configAPI();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(), // holds the logged-in user's info 
      socket: undefined,    // set to the socket connection when the lobby loads up
      creating: false,      // set to true when user clicks `Create` for the first time
      joining: false,       // set to true when user clicks `Join` for the first time
      loading: false,       // set to true when user clicks `Create` or `Join` after configuring options
      status: false,        // set to true when a game gets started
      gameId: undefined,    // same as userId of the game's creator
      player1: undefined,   // user who creates a game
      player2: undefined,    // user who joins the game
      timerDetails: {
        category: 'Blitz',
        totalTime: 1800000
      }
    }
  }

  // Display options for creating a game
  showCreate = _ => {
    this.setState({loading: false, creating: true,  joining: false})
  }

  // Create a game with a unique gameId (player1's userId)
  createGame() {

    const { socket, user } = this.state;

    this.setState({
      loading: true
    });

    socket.emit('create_game', {
      userId: user._id,
      username: user.username
    });
  }

  // Display options for joining a game
  showJoin = _ => {
    this.setState({loading: false, creating: false,  joining: true})
  }

  // Join a game with a unique gameId (player1's userId)
  joinGame(gameId) {

    const { socket, user } = this.state;

    this.setState({
      loading: true
    });

    socket.emit('join_game', {
      userId: user._id,
      username: user.username,
      gameId: gameId
    });
  }

  // Start a game with a unique gameId (player1's userId)
  startGame = (gameInfo) => {

    this.setState({
      status: true,
      gameId: gameInfo.gameId,
      player1: gameInfo.createdBy,
      player2: gameInfo.joinedBy
    });
  }

  // Establishes socket connection when the page loads up
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

      });
    });
  }

  // Disconnects socket on page exit (or refresh)
  componentWillUnmount() {
    if( this.state.socket ) {
      this.state.socket.disconnect();
    }
  }

  render() {
    return (
      <div>
        { this.state.status
            ? <Game // renders gameboard
                gameId = { this.state.gameId }
                socket = { this.state.socket }
                self = { this.state.user }
                opponent = { this.state.player1.username !== this.state.user.username ? this.state.player1 : this.state.player2 }
                timerDetails={ this.state.timerDetails }
              />
            : <div> 
                <Card className = 'text-center lobby-card' bg = 'dark' text = 'light'>
                  <Card.Title> Welcome to the Lobby </Card.Title>
                  { !(this.state.loading || this.state.creating || this.state.joining) 
                    // renders default view of the lobby
                      ? <div>
                          <Button
                            variant = 'pbchess'
                            name = 'create'
                            onClick = { _ => this.showCreate()  }
                          >
                            Create
                          </Button>{ ' ' }
                          <Button
                            variant = 'pbchess'
                            name = 'join'
                            onClick = { _ => this.showJoin() }
                          >
                            Join
                          </Button>
                        </div>
                      : ''
                  }
                  { this.state.loading // renders loader
                      ? <div>
                          <Spinner animation = 'border' role = 'status'>
                            <span className = 'sr-only'>Loading...</span>
                          </Spinner>
                        </div>
                      : ''
                  }
                  { this.state.creating
                    ? <CreateGame // renders option for creating a game
                        socketId = { this.state.socket.id } 
                        loading = { this.state.loading }
                        showJoin = { _ => this.showJoin() } 
                        createGame = { _ => this.createGame() }
                      />
                    : ''
                  }
                  { this.state.joining
                      ? <JoinGame // renders option for joining a game
                          socket = { this.state.socket }
                          showCreate = { _ => this.showCreate() }
                          joinGame = { e => this.joinGame(e) }
                        />
                      : ''
                  }
                </Card>
              </div>
        }
      </div>
    )
  }
}

export default Lobby;
