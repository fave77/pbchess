import React from 'react';
import io from 'socket.io-client';

import './lobby.css';

import { PlayGame, SpectateGame } from '../game/game';
import configAPI from '../../configs/api.config';
import AuthService from '../../services/auth.service';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
      start: false,        // set to true when a game gets started
      spectate: false,      // set to true for spectating a game
      gameId: undefined,    // initialized with default _id from MongoDB 
      player1: undefined,   // user who creates a game
      player2: undefined,    // user who joins the game
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' // default fen notation
    }
  }

  // Display options for creating a game
  showCreate = _ => {
    this.setState({ creating: true,  joining: false })
  }

  // Create a game with a unique gameId
  createGame() {

    const { socket, user } = this.state;

    socket.emit('create_game', {
      userId: user._id,
      username: user.username,
    });
  }

  // Display options for joining a game
  showJoin = _ => {
    this.setState({ creating: false,  joining: true })
  }

  // Join a game with a unique gameId
  joinGame(gameId) {

    const { socket, user } = this.state;

    socket.emit('join_game', {
      userId: user._id,
      username: user.username,
      gameId: gameId
    });

  }

  // Start a game with a unique gameId
  startGame = gameInfo => {

    this.setState({
      start: true,
      player1: gameInfo.createdBy,
      player2: gameInfo.joinedBy,
      gameId: gameInfo.gameId
    });
  }

  // Spectate a game with a unique gameId
  spectateGame = gameInfo => {

    this.setState({
      spectate: true,
      player1: gameInfo.createdBy,
      player2: gameInfo.joinedBy,
      gameId: gameInfo.gameId,
      fen: gameInfo.fen
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

        socket.on('spectate_game', gameInfo => {
          this.spectateGame(gameInfo);
        });

        socket.on('new_game', gameId => {
          this.setState({
            gameId: gameId
          });
        });

        const url = window.location.href;
        if (url.indexOf('/game') !== -1) {
          const gameId = url.slice(url.indexOf('/game/') + 6);
          console.log(gameId);
          if (gameId) {
            this.joinGame(gameId);
          }
        }
        
      });
    });
  }

  render() {

    return (
      <div>
        { this.state.start
            ? <PlayGame // renders gameboard
                gameId = { this.state.gameId }
                socket = { this.state.socket }
                player1 = { this.state.player1.username === this.state.user.username ? this.state.player1 : this.state.player2 }
                player2 = { this.state.player1.username === this.state.user.username ? this.state.player2 : this.state.player1 }
                orientation = { this.state.player1.username === this.state.user.username ? 'white' : 'black'} 
                movable = { true }
                timerDetails = { this.state.timerDetails }
              />
            : this.state.spectate 
                ? <SpectateGame // renders gameboard
                    gameId = { this.state.gameId }
                    socket = { this.state.socket }
                    player1 = { this.state.player1 }
                    player2 = { this.state.player2 }
                    orientation = { 'white'} 
                    movable = { false }
                    timerDetails = { this.state.timerDetails }
                    fen = { this.state.fen }
                  />
                : <div> 
                  <Card className = 'text-center lobby-card' bg = 'dark' text = 'light'>
                    <Card.Title> Welcome to the Lobby </Card.Title>
                    { !(this.state.creating || this.state.joining) 
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
                    { this.state.creating
                      ? <CreateGame // renders option for creating a game
                          gameId = { this.state.gameId } 
                          socket = { this.state.socket }
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
