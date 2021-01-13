const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
  userId: String,
  fullname: String,
  email: String,
  avatar: String,
  gender: String,
  country: String,
  joined: String
});

module.exports = model('Profile', profileSchema, 'profiles');
