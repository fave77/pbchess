const { Chess } = require('chess.js');
const { validatePawnPromotion, evaluateGame, saveGame } = require('../services/chess.service');
const { Types } = require('mongoose');
const Game = require('../models/game.model');

// Called while creating a game
const createGame = async (io, socket, data, liveGames) => {
  try {

    const newGame = new Game({
      createdBy: { ...data },
      joinedBy: null,
      state: '',
      outcome: 'NA'
    });

    const game = await newGame.save();
    const gameId = JSON.parse(JSON.stringify(game._id));

    console.log('Creating a game ==>', gameId);

    await liveGames.hmset(gameId, '*', JSON.stringify({
      createdBy: { ...data },
      joinedBy: undefined,
      state: '',
      ongoing: false
    }));

    socket.join(gameId);
    socket.emit('new_game', gameId);

  } catch(err) {
    console.log('Unable to create a game', err);
    socket.emit('cannot_create_game', 'Cannot create! Internal Server Error');
  }

  // TODO: emit a socket event for the frontend lobby (along with room id)
};

// Called while spectating a game
const spectateGame = (io, socket, data, game) => {
  console.log('Spectating a game ==>', data.gameId);

  socket.join(data.gameId);
  const chess = new Chess();
  chess.load_pgn(game.state);

  io.to(data.gameId).emit('spectate_game', {
    createdBy: game.createdBy,
    joinedBy: game.joinedBy,
    gameId: data.gameId,
    fen: chess.fen()
  });
};

// Called while joining a game
const joinGame = (io, socket, data, liveGames) => {
  try {
    liveGames.hgetall(data.gameId, (err, res) => {
      const game = Boolean(res) ? JSON.parse(res['*']): undefined;
      if (!game)
        socket.emit('cannot_join_game', 'Cannot join! Room ID is invalid');

      else if (game.createdBy.userId === data.userId)
        socket.emit('cannot_join_game', 'Cannot join! C\'mon it\'s your own game');

      else if (game.ongoing) {
        spectateGame(io, socket, data, game);
      }

      else {
        console.log('Joining a game ==>', data.gameId);

        socket.join(data.gameId);
        game.joinedBy = {
          userId: data.userId,
          username: data.username
        };

        game.ongoing = true;

        liveGames.hmset(data.gameId, '*', JSON.stringify(game));
        io.to(data.gameId).emit('start_game', {
          createdBy: game.createdBy,
          joinedBy: game.joinedBy,
          gameId: data.gameId
        });
      }
    });
  } catch(err) {
    console.log('Unable to join a game', err);
    socket.emit('cannot_join_game', 'Cannot join! Internal Server Error');
  }

};

// Called while moving pieces
const movePiece = (io, socket, data, liveGames) => {
  const { gameId, ...pendingMove } = data;

  liveGames.hgetall(gameId, async (err, res) => {
    const game = JSON.parse(res['*']);
    const chess = new Chess();
    chess.load_pgn(game.state);
    const gameState = {
      fen: undefined,
      lastMove: undefined,
      gameOver: false,
      turn: undefined,
    };

    if (!chess.game_over())
      gameState.lastMove = chess.move(pendingMove);
      gameState.fen = chess.fen();
      gameState.turn = chess.turn();

    if (gameState.lastMove === null)
      if (validatePawnPromotion(socket, chess, pendingMove)) return;

    game.state = chess.pgn();
    liveGames.hmset(gameId, '*', JSON.stringify(game));

    if (chess.game_over()) {
      console.log('Game Over ==>', gameId);
      gameState.gameOver = evaluateGame(chess);
      await saveGame(gameId, game, gameState.gameOver.result, Game);
      await liveGames.del(gameId);
    }
    io.to(gameId).emit('move_piece', gameState);
  });
};

// Called when player leaves the game
const leaveGame = (io, socket, gameId, liveGames) => {
  liveGames.hgetall(gameId, async (err, res) => {
    if (res !== null && Boolean(res)) {
      console.log('Leaving the game ==>', gameId);
      const liveGame = JSON.parse(res['*']);
      await saveGame(gameId, liveGame, 'playerleft', Game);
      await liveGames.del(gameId);
      io.to(gameId).emit('abort_game', 'Opponent left the game! You won by default');
    }
  });
};

// Called while fetching game details from DB
const fetchGameDetails = async (req, res) => {
  
  try {
    console.log(req.body.gameId);
    const game = await Game.findOne({ _id: Types.ObjectId(req.body.gameId) });
    console.log("Fetching a game ==>", req.body.gameId);
    console.log(game)
    if (!game)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Invalid gameId! Could not find a game...'
        });
    console.log(game)
    return res
      .status(200)
      .json({
        success: true,
        gameId: game.gameId,
        createdBy: game.createdBy,
        joinedBy: game.joinedBy,
        state: game.state,
        outcome: game.outcome
      });
  } catch(error) {
    console.log(error);
    return res.json({ success: false, msg: error });
  }
};

module.exports = {
  createGame, 
  joinGame, 
  spectateGame, 
  movePiece, 
  leaveGame, 
  fetchGameDetails
};
