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

  socket.join(game.roomId);
  game['joinedBy'] = playerInfo;

  const chess = new Chess();
  game['status'] = chess;

  liveGames[game.roomId] = game;
  io.to(game.roomId).emit('start_game', game);
};

const move = (io, socket, pendingMove) => {
  for (let id in socket.rooms) {
    if (id in liveGames) {
      const game = liveGames[id];
      const chess = game.status;
      const gameState = {
        fen: undefined,
        lastMove: undefined,
        msg: 'game ongoing'
      };

      if (!chess.game_over())
        gameState.lastMove = chess.move(pendingMove);
      if (chess.game_over())
        gameState.msg = 'game over';

      gameState.fen = chess.fen();
      io.to(id).emit('move_piece', gameState);
    }
  }

};

module.exports = {
  create, join, move
};
