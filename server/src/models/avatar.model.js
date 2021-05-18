const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarSchema = new Schema({
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
});

module.exports = mongoose.model('Avatar', avatarSchema, 'avatars');