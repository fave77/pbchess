const { Chess } = require('chess.js');

const game = new Chess();


// here you can start emitting events to the client
const create = (io, data) => {
  console.log('GAME RECEIVED', data);
  data.id = Math.floor(Math.random() * 100000000);
  io.emit('RECEIVE_GAME', data);
};

const join = data => {
  io.emit('START_GAME', data);
};

const movePiece = data => {
  console.log('RECEIVED MOVE', data);
  io.emit('PUSH_MOVE', data);
};

const makeRoom = data => {
  const { room, userId } = data;
  console.log('INCOMING ROOM', room);
  socket.join(room);
  socket.emit('RECEIVE_ID', userId);
  console.log(`USER ${userId} JOINED ROOM #${room}`);
};

const selectPiece = data => {
  io.emit('PUSH_SELECT_PIECE', data);
};

const setIds = ids => {
  io.emit('RECEIVE_IDS', ids);
};

module.exports = {
  create, join, movePiece, makeRoom, selectPiece, setIds
};
