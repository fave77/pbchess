const Profile = require('../models/profile.model');

const fetchProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.body.userId });
    if (!profile)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Could not find profile!'
        });

    const { fullname, email, avatar, gender, country } = profile;

    return res
      .status(200)
      .json({
        success: true,
        fullname,
        email,
        avatar,
        gender,
        country
      });

  } catch(err) {
    next(err);
  }
};

const updateProfile = async (req, res) => {

  try {

    const profile = await Profile.findOneAndUpdate({
      userId: req.body.userId
    }, {
      fullname: req.body.fullname,
      email: req.body.email,
      avatar: req.body.avatar,
      gender: req.body.gender,
      country: req.body.country
    }, {
      new: true
    });

    const { fullname, email, avatar, gender, country } = profile;

    return res.json({
      success: true,
      fullname,
      email,
      avatar,
      gender,
      country,
      msg: 'Profile Updated Successfully!'
    });

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};

module.exports = {
  fetchProfile,
  updateProfile
};
