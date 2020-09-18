const User = require('../models/user.model');
const utils = require('../configs/auth.config');

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


const register = async (req, res) => {
	const { salt, hash } = utils.createPassword(req.body.password);

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt
  });

  try {
    const user = await newUser.save();
    return res.json({ success: true, user: user });

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};

const demo = (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      msg: 'You are successfully authenticated to this route!'
    });
};

module.exports = {
	login,
  register,
  demo
}
