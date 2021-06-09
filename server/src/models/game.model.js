const { model, Schema } = require('mongoose');

// Schema for games
const gameSchema = new Schema({
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
