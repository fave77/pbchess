const Profile = require('../models/profile.model');

// Called while viewing the profile
const fetchProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.body.username });
    if (!profile)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Could not find profile!'
        });

    const { fullname, email, avatar, gender, country, joined } = profile;

    return res
      .status(200)
      .json({
        success: true,
        fullname,
        joined,
        email,
        avatar,
        gender,
        country
      });

  } catch(err) {
    next(err);
  }
};

// Called while updating the profile
const updateProfile = async (req, res) => {

  try {

    const profile = await Profile.findOneAndUpdate({
      username: req.body.username
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
