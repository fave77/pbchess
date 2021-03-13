const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const utils = require('../services/auth.service');
const generatePassword = require('generate-password');
const sendMail = require('../services/email.service');
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on("register", (req) => {
    // Email message
    const message = `Your username is ${req.username} your password is ${req.password}. Have a great day ahead.`;
    // Sends an email to the client
    sendMail(req.email, 'Thank you for registering at PbChess', message);
});

// Called while login
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Could not find user!'
        });

    const isPasswordValid = utils.checkPassword(req.body.password, user.hash, user.salt);
    if (isPasswordValid) {
      const tokenObject = utils.issueJWT(user);
      return res
        .status(200)
        .json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          username: user.username,
          _id: user._id,
        });
    } else
      return res
        .status(401)
        .json({
          success: false,
          msg: 'You entered the wrong password!'
        });

  } catch(err) {
    next(err);
  }

};

// Called while registering
const register = async (req, res) => {

  try {
    const currUser = await User.findOne({ username: req.body.username });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'Username already exists! Try an even better one...' });

    const { salt, hash } = utils.createPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt
    });

    const user = await newUser.save();

    const newProfile = new Profile({
      username: user.username,
      fullname: req.body.fullname,
      email: req.body.email,
      avatar: 'NA',
      gender: 'NA',
      country: 'NA',
      joined: new Date().toGMTString().slice(0, -13)
    });

    const profile = await newProfile.save();

    const tokenObject = utils.issueJWT(user);
    
    return res.json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      username: user.username,
      _id: user._id,
      msg: 'Registered Successfully!'
    });

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};

// Called when signing in with google
const signIn = async (req, res) => {

  try {

    // Finds the user based on their profile email
    let currUser = await Profile.findOne({ email: req.body.email });

    if (currUser){
      // Finds the user based on their user name
      currUser = await User.findOne({username : req.body.username});
      const tokenObject = utils.issueJWT(currUser);
      return res
        .status(200)
        .json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          username: currUser.username,
          _id: currUser._id,
        });
    }

    // Generating a random password
    const password = generatePassword.generate({
      length: 10,
      numbers: true
    });

    const { salt, hash } = utils.createPassword(password);
    
    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt
    });

    const user = await newUser.save();

    const newProfile = new Profile({
      username: user.username,
      fullname: req.body.fullname,
      email: req.body.email,
      avatar: 'NA',
      gender: 'NA',
      country: 'NA',
      joined: new Date().toGMTString().slice(0, -13)
    });

    const profile = await newProfile.save();

    const tokenObject = utils.issueJWT(user);

    try{
      emitter.emit("register", {email: req.body.email, username: req.body.username, password: password});
    }catch(error){
      console.log("Unable to send email");
    }
    
    return res.json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      username: user.username,
      _id: user._id,
      msg: 'Registered Successfully!'
    });
  } catch (err) {
    return res.json({ success: false, msg: err });
  }
};

module.exports = {
	login,
  register,
  signIn
}
