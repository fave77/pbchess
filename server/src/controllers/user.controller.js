const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const utils = require('../services/auth.service');

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
    console.log(req.body.fullname, req.body.email)
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

module.exports = {
	login,
  register
}
