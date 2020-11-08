const {
  create, join, move
} = require('../controllers/game.controller.js');

const configSocket = io => {

  io.on('connection', socket => {
    console.log('Socket connected', socket.id);

    // here you can start emitting events to the client
    socket.on('create_game', data => {
      create(io, socket, data);
    });
    socket.on('join_game', data => {
      join(io, socket, data);
    });
    socket.on('move_piece', data => {
      move(io, socket, data);
    });
  });
};

module.exports = {
  configSocket
};
