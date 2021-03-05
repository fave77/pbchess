const { Chess } = require('chess.js');
const { validatePawnPromotion, evaluateGame } = require('../services/chess.service');

// Called while creating a game
const create = (io, socket, data, liveGames) => {

  console.log('Creating a game...');

  liveGames.hmset(socket.id, '*', JSON.stringify({
    createdBy: { ...data },
    joinedBy: undefined,
    state: '',
    ongoing: false
  }));


  // TODO: emit a socket event for the frontend lobby (along with room id)
};

// Called while joining a game
const join = (io, socket, data, liveGames) => {

  liveGames.hgetall(data.roomId, (err, res) => {
    const game = res ? JSON.parse(res['*']): undefined;
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

      liveGames.hmset(data.roomId, '*', JSON.stringify(game));

      io.to(data.roomId).emit('start_game', {
        createdBy: game.createdBy,
        joinedBy: game.joinedBy,
        roomId: data.roomId
      });
    }
  });

};

// Called while moving pieces
const move = (io, socket, data, liveGames) => {
  const { roomId, ...pendingMove } = data;

  liveGames.hgetall(roomId, (err, res) => {
    const game = JSON.parse(res['*']);
    const chess = new Chess()
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

    if (chess.game_over()) {
      gameState.gameOver = evaluateGame(chess);
      console.log('Purging the game...');
      liveGames.del(roomId);
    }

    if (gameState.lastMove === null)
      if (validatePawnPromotion(socket, chess, pendingMove)) return;

    game.state = chess.pgn();

    liveGames.hmset(roomId, '*', JSON.stringify(game));
    io.to(roomId).emit('move_piece', gameState);
  });
};

// Called while leaving the game
const disconnect = (socket, liveGames) => {
  console.log('Socket disconnected', socket.id);
  const roomId = Object.keys(socket.adapter.rooms)[0] || socket.id;

  liveGames.hgetall(roomId, (err, res) => {

    if (res !== null) {
      console.log('Purging the game...');
      liveGames.del(roomId);
      socket.broadcast.emit('abort_game', 'Opponent left the game! You won by default');
    }
  });
};

module.exports = {
  create, join, move, disconnect
};
