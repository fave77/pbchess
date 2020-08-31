const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
  hash: String,
	salt: String
});

module.exports = model('User', userSchema);
