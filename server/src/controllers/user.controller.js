const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const utils = require('../services/auth.service');
const generatePassword = require('generate-password');
const sendMail = require('../services/email.service');
const { OAuth2Client } = require('google-auth-library');

const clientID = process.env.CLIENT_ID;
const client = new OAuth2Client(clientID);

const registerViaPbChess = async (fullname, username, password, email) => {

  const user = await registerUser(fullname, username, password, email, false);
  const url = process.env.NODE_ENV == "development" ? process.env.DEV_CLIENT_URI : process.env.PROD_CLIENT_URI
  
  const message = `Thank you for registering at Pbchess. Your username is ${username}. 
  Please confirm your email using the given link to continue to the site. ${url}/confirm?userId=${user._id}`;

  
  await sendMail(email, 'Email Confirmation', message);
  return user;
}

const registerViaGoogle = async (fullname, username, password, email) => {

  const user = await registerUser(fullname, username, password, email, true);
  const message = `Thank you for registering at Pbchess. Your username is ${username} and password is ${password}. 
  Have a great day ahead`;
  
  await sendMail(email, 'Thank you for registering at PbChess', message)
  return user;
}

const registerUser = async (fullname, username, password, email, status) => {

  const { salt, hash } = utils.createPassword(password);

  const newUser = new User({
    username: username,
    hash: hash,
    salt: salt,
    status: status
  });

  const user = await newUser.save();
  
  const newProfile = new Profile({
    username: user.username,
    fullname: fullname,
    email: email,
    avatar: 'NA',
    gender: 'NA',
    country: 'NA',
    joined: new Date().toGMTString().slice(0, -13)
  });

  const profile = await newProfile.save();

  return user;
}


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
    
    if(!user.status){
      return res.status(422).json({
        success: false,
        msg: 'Please verify your email and try again.'
      })
    }

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
    let currUser = await User.findOne({ username: req.body.username });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'An account with this username already exists! Try an even better one...' });

    currUser = await Profile.findOne({ email : req.body.email });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'An account with this email already exists! Try an alternate one...' });
      

    const user = await registerViaPbChess(req.body.fullname, req.body.username, req.body.password, req.body.email);

    return res.json({
      success: false,
      msg: 'Registered Successfully! Please confirm your email to start playing.'
    });

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};

// Called when signing in with google
const signIn = async (req, res) => {

  try {

    const response = await (await client.verifyIdToken({idToken: req.body.idToken, audience: clientID}));
    const data = response.payload;

    const fullname = data.name;
    const email = data.email;
    const username = email.substring(0, email.indexOf('@')); 

    // Finds the user based on their profile email
    let currUser = await Profile.findOne({ email: email });


    if (currUser){
      // Finds the user based on their username
      currUser = await User.findOne({username : currUser.username});
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


    const user = await registerViaGoogle(fullname, username, password, email);

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


const confirm = async (req, res) => {
  const id = req.body.userId;
  
  if(!id){
    return res.json({msg: "You are not Authorized on this route!"});
  }
  let user = await User.findOne({_id: id});

  if(!user){
    return res.json({msg: "You are not Authorized on this route!"});
  }

  if(user.status){
    return res.json({msg: "Your Email is already verified"});
  }

  user = await User.findOneAndUpdate({ _id: id }, {
    status: true
  });

  console.log("Successfully updated");
  return res.json({msg: "Verified Successfully"});
};

const updatePassword = async (req, res) => {

  try{
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const userId = req.body.userId;
  
    const user = await User.findById(userId)
    
    const valid = utils.checkPassword(oldPassword, user.hash, user.salt);

    if(!valid){
      return res.json({
        success: false,
        msg: "You have entered an invalid password"
      })
    }
  
    const { salt, hash } = utils.createPassword(newPassword);
  
    const newUser = await User.findOneAndUpdate({_id : userId}, {
      salt: salt,
      hash: hash
    })
    
    return res.json({
      success: true,
      msg: "You have successfully updated your password. Please login to continue."
    })
  }catch(error){
    console.log(error);
    return res.json({ success: false, msg: error });
  }

}

module.exports = {
	login,
  register,
  signIn,
  confirm,
  updatePassword
}
