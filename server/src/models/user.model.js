const { model, Schema } = require('mongoose');

// Schema for users
const userSchema = new Schema({
  username: String,
  hash: String,
	salt: String
});

module.exports = model('User', userSchema, 'users');
