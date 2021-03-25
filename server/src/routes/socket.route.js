const {
  create, join, move, disconnect, timeout
} = require('../controllers/game.controller');

// Socket router for handling events emitted from the client
const socketRouter = (io, liveGames) => {

  io.on('connection', socket => {
    console.log('Socket connected', socket.id);

    socket.on('create_game', data => {
      create(io, socket, data, liveGames);
    });
    socket.on('join_game', data => {
      join(io, socket, data, liveGames);
    });
    socket.on('move_piece', data => {
      move(io, socket, data, liveGames);
    });
    socket.on('timeout', data=>{
      timeout(socket, data, liveGames);
    })
    socket.on('disconnect', _ => {
      disconnect(socket, liveGames);
    });

  });
};

module.exports = socketRouter;
