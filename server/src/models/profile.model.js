const { model, Schema } = require('mongoose');

// Schema for profiles
const profileSchema = new Schema({
  username: String,
  fullname: String,
  email: String,
  avatar: { 
      top: String,
      accessories: String,
      hairColor: String,
      facialHair: String,
      clothes: String,
      clothColor: String,
      eyes: String,
      eyebrow: String,
      mouth: String,
      skin: String,
  },
  gender: String,
  country: String,
  joined: String,
  lichess: String,
});

module.exports = model('Profile', profileSchema, 'profiles');
