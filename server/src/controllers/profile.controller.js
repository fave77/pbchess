const Profile = require('../models/profile.model');
const Avatar = require('../models/avatar.model')


// Called while viewing the profile
const fetchProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.body.username }).populate("avatar");
    if (!profile)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Could not find profile!'
        });
        

    const { fullname, email, avatar, gender, country, joined } = profile;
    console.log(profile)

    return res
      .status(200)
      .json({
        success: true,
        fullname,
        joined,
        email,
        avatar,
        gender,
        country,
          });

  } catch(err) {
    next(err);
  }
};

// Called while updating the profile
const updateProfile = async (req, res) => {

  try {

    const avatarmodel = await Avatar.findOneAndUpdate({
      _id : req.body.avatar._id
    },{
      top : req.body.avatar.top,
      accessories :  req.body.avatar.accessories,
      hairColor : req.body.avatar.hairColor,
      facialHair : req.body.avatar.facialHair,
      clothes : req.body.avatar.clothes,
      eyes : req.body.avatar.eyes,
      eyebrow : req.body.avatar.eyebrow,
      mouth : req.body.avatar.mouth,
      skin : req.body.avatar.skin,
      clothColor: req.body.avatar.clothColor
    }, {
      new: true
    })

    const profile = await Profile.findOneAndUpdate({
      username: req.body.username
    }, {
      fullname: req.body.fullname,
      email: req.body.email,
      gender: req.body.gender,
      country: req.body.country
    }, {
      new: true
    }).populate("avatar");

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
