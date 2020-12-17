const { Chess } = require('chess.js');

const liveGames = {};

// here we can start emitting events to the client
const create = (io, socket, data) => {
  console.log('Creating a game...');

  liveGames[socket.id] = {
    createdBy: { ...data },
    joinedBy: undefined,
    state: new Chess(),
    ongoing: false
  };





  // emit an socket event for frontend lobby adnd send back the room id
};

const join = (io, socket, data) => {

  const game = liveGames[data.roomId];

  if (!game)
    socket.emit('cannot_join_game', 'Cannot join! Room ID is invalid');

  else if (game.ongoing)
    socket.emit('cannot_join_game', 'Cannot join! Game has already started');

  else if (game.createdBy.userId === data.userId)
    socket.emit('cannot_join_game', 'Cannot join! C\'mon it\'s your own game');

  else {
    console.log('Joining a game...');

    socket.join(data.roomId);
    game.joinedBy = {
      userId: data.userId,
      username: data.username
    };
    game.ongoing = true;

    io.to(data.roomId).emit('start_game', {
      createdBy: game.createdBy,
      joinedBy: game.joinedBy,
      roomId: data.roomId
    });
  }

};

const validatePawnPromotion = (socket, chess, pendingMove) => {
  const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === pendingMove.from) {
        socket.emit('promotion', pendingMove);
        return true;
      }
    }
  return false;
};

const evaluateGame = game => {
  const chess = game.state;
  if (chess.in_checkmate()) {
    return {
      result: 'checkmate'
    };
  } else if (chess.in_stalemate()) {
    return {
      result: 'stalemate'
    };
  } else if (chess.in_threefold_repetition()) {
    return {
      result: 'threefold repetition'
    };
  } else if (chess.insufficient_material()) {
    return {
      result: 'insufficient material'
    };
  } else {
    return {
      result: '50 move rule'
    };
  }

};

const move = (io, socket, data) => {
  const { roomId, ...pendingMove } = data;
  const game = liveGames[roomId];
  const chess = game.state;
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

  if (chess.game_over()) {
    gameState.gameOver = evaluateGame(game);
    delete liveGames[roomId];
  }

  if (gameState.lastMove === null)
    if (validatePawnPromotion(socket, chess, pendingMove)) return;

  io.to(roomId).emit('move_piece', gameState);

};

module.exports = {
  create, join, move
};
