const { model, Schema } = require('mongoose');

// Schema for profiles
const gameSchema = new Schema({
  gameId: String,
  createdBy: {
    userId: String,
    username: String
  },
  joinedBy: {
    userId: String,
    username: String
  },
  state: String,
  outcome: String
});

module.exports = model('Game', gameSchema, 'games');
