const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

// Schema for profiles
const profileSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  avatar: { type: ObjectId, ref: 'Avatar'},
  gender: String,
  country: String,
  joined: String,
  lichess: String,
});

module.exports = mongoose.model('Profile', profileSchema, 'profiles');
