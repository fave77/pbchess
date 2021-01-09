const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
  userId: String,
  fullname: String,
  email: String,
  avatar: String,
  gender: String,
  country: String
});

module.exports = model('Profile', profileSchema, 'profiles');
