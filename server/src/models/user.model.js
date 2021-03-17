const { model, Schema } = require('mongoose');

// Schema for users
const userSchema = new Schema({
  username: String,
  hash: String,
	salt: String,
  status: Boolean
});

module.exports = model('User', userSchema, 'users');
