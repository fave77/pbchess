const {
  create, join, movePiece, makeRoom, selectPiece, setIds
} = require('../controllers/game.controller.js');

const configSocket = (socket, server) => {
  const io = socket(server);

  io.on('connection', socket => {
    console.log('Socket connected');

    // here you can start emitting events to the client
    socket.on('CREATE_GAME', game => {
      create(io, game);
    });
    socket.on('JOIN_GAME', join)
    socket.on('MOVE_PIECE', movePiece);
    socket.on('ROOM', makeRoom);
    socket.on('SELECT_PIECE', selectPiece);
    socket.on('SET_IDS', setIds);
  });

  const newGame = socket(server, { path: '/game/:id' });

  newGame.on('connection', socket => {
    console.log('Socket is connected to the game');
  });
};

module.exports = {
  configSocket
};
