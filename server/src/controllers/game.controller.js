const { Chess } = require('chess.js');
const lobby = [];
const liveGames = {};

// here we can start emitting events to the client
const create = (io, socket, playerInfo) => {
  console.log('Creating a game...');

  const game = {
    roomId: socket.id,
    createdBy: playerInfo
  };
  lobby.push(game);
};

const join = (io, socket, playerInfo) => {
  console.log('Joining a game...');

  const game = lobby.pop(0);
  const chess = new Chess();

  socket.join(game.roomId);
  game['joinedBy'] = playerInfo;
  game['state'] = chess;
  liveGames[game.roomId] = game;

  const { state, ...gameInfo } = game;
  io.to(game.roomId).emit('start_game', gameInfo);
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
