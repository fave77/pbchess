const {
  createGame, joinGame, movePiece, leaveGame, spectateGame
} = require('../controllers/game.controller');

// Socket router for handling events emitted from the client
const socketRouter = (io, liveGames) => {

  io.on('connection', socket => {
    console.log('Socket connected', socket.id);

    socket.on('create_game', data => {
      createGame(io, socket, data, liveGames);
    });

    socket.on('join_game', data => {
      joinGame(io, socket, data, liveGames);
    });

    socket.on('spectate_game', data => {
      spectateGame(io, socket, data, liveGames);
    });

    socket.on('move_piece', data => {
      movePiece(io, socket, data, liveGames);
    });

    socket.on('disconnecting', () => {
      const rooms = Object.keys(socket.rooms);
      if (rooms.length > 1)
        setTimeout(() => leaveGame(io, socket, rooms[1], liveGames), 5000);
    });

    socket.on('disconnect', _ => {
      console.log('Socket disconnected', socket.id);
    });

  });
};

module.exports = socketRouter;
