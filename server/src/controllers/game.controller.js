const { Chess } = require('chess.js');

const { configStorage } = require('../configs/storage.config');

// here we can start emitting events to the client
const create = (io, socket, data, liveGames) => {
  console.log('Creating a game...');

  liveGames.hmset(socket.id, '*', JSON.stringify({
    createdBy: { ...data },
    joinedBy: undefined,
    state: '',
    ongoing: false
  }));


  // emit an socket event for frontend lobby adnd send back the room id
};

const join = (io, socket, data, liveGames) => {

  liveGames.hgetall(data.roomId, (err, res) => {
    console.log(res);
    const game = JSON.parse(res['*']);
    console.log(game);
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

const evaluateGame = chess => {
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

const move = (io, socket, data, liveGames) => {
  const { roomId, ...pendingMove } = data;

  liveGames.hgetall(roomId, (err, res) => {
    console.log(res);
    const game = JSON.parse(res['*']);
    console.log(game);
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
      liveGames.del(roomId);
    }

    if (gameState.lastMove === null)
      if (validatePawnPromotion(socket, chess, pendingMove)) return;

    game.state = chess.pgn();

    liveGames.hmset(roomId, '*', JSON.stringify(game));
    io.to(roomId).emit('move_piece', gameState);
  });
};

const disconnect = (socket, liveGames) => {
  console.log('Socket disconnected', socket.id);
  const roomId = Object.keys(socket.adapter.rooms)[0];

  liveGames.get(roomId, (err, res) => {
    if (!(err || res === null)) {
      console.log('Purging the game...')
      liveGames.del(roomId);
      socket.broadcast.emit('abort_game', 'Opponent left the game! You won by default');
    }
  });
};

module.exports = {
  create, join, move, disconnect
};
