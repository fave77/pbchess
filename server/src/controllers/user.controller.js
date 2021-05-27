const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const utils = require('../services/auth.service');
const generatePassword = require('generate-password');
const sendMail = require('../services/email.service');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const savePassword = require('../services/password.service');
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleOAuth2Client = new OAuth2Client(googleClientID);

const { configClient } = require('../configs/client.config');
const CLIENT_URL = configClient();

/* Following 5 functions perform user registration via 
  Google <Oauth>, Lichess <OAuth>, Pbchess <POST /register>
*/


// creates new respective user and profile collection on DB
const registerUser = async (fullname, username, password, email, status, lichess = 'NA') => {

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
    avatar: {
      top:"LongHairStraight",
      accessories:"Blank",
      hairColor:"BrownDark",
      facialHair:"Blank",
      clothes:"BlazerShirt",
      eyes:"Default",
      eyebrow:"Default",
      mouth:"Default",
      skin:"Light",
      clothColor: "Black"
    },
    gender: 'NA',
    country: 'NA',
    joined: new Date().toGMTString().slice(0, -13),
    lichess: lichess
  });

  const profile = await newProfile.save();

  return user;
};

// invokes registerUser for creating new record and sends confirmation mail 
const registerViaPbChess = async (pbchessProfile) => {

  const { fullname, username, password, email } = pbchessProfile;

  const user = await registerUser(fullname, username, password, email, false);  
  const message = `Thank you for registering at Pbchess. Your username is ${username}. 
  Please confirm your email using the given link to continue to the site. ${CLIENT_URL}/confirm?userId=${user._id}`;
  await sendMail(email, 'Thank you for registering at Pbchess', message);
  return user;

}

// invokes registerUser for creating new record and sends confirmation mail 
const registerViaGoogle = async (googleProfile) => {

  const fullname = googleProfile.name;
  const email = googleProfile.email;
  let username = email.substring(0, email.indexOf('@')); 

  // Generating a random password
  const password = generatePassword.generate({
    length: 10,
    numbers: true
  });

  const dbUser = await User.findOne({username: username});

  if(dbUser){
    username += Math.floor(Math.random() * 1000000);
  }

  const user = await registerUser(fullname, username, password, email, true);
  const message = `Thank you for registering at pbchess. Your username is ${username} and password is ${password}. Have a great day ahead!`;
  await sendMail(email, 'Thank you for registering at Pbchess', message);
  return user;

}

// invokes registerUser for creating new record and sends confirmation mail 
const registerViaLichess = async (lichessProfile) => {

  const fullname = 'NA';
  const email = lichessProfile.email;
  let username = lichessProfile.username;
  const lichessURL = lichessProfile.profileUrl;

  // Generating a random password
  const password = generatePassword.generate({
    length: 10,
    numbers: true
  });

  const dbUser = await User.findOne({username: username});

  if(dbUser){
    username += Math.floor(Math.random() * 1000000);
  }

  const user = await registerUser(fullname, username, password, email, true, lichessURL);
  const message = `Thank you for registering at pbchess. Your username is ${username} and password is ${password}. Have a great day ahead!`;
  await sendMail(email, "Thank you for registering at Pbchess", message)
  return user;

};

// Called when registering with Pbchess
const register = async (req, res) => {

  try {
    let currUser = await User.findOne({ username: req.body.username });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'An account with this username already exists! Try an even better one...' });

    currUser = await Profile.findOne({ email : req.body.email });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'An account with this email already exists! Try an alternate one...' });
      

    const user = await registerViaPbChess(req.body);

    return res.json({
      success: false,
      msg: 'Registered Successfully! Please confirm your email to start playing.'
    });

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};

/* Following 3 functions perform user login via 
  Google <Oauth>, Lichess <OAuth>, Pbchess <POST /login>
*/

// Called when signing in with Google
const googleSignIn = async (req, res) => {

  try {

    const response = await (await googleOAuth2Client.verifyIdToken({idToken: req.body.idToken, audience: googleClientID}));
    const googleProfile = response.payload;

    // Finds the user based on their email
    let currUser = await Profile.findOne({ email: googleProfile.email });


    if (currUser){
      // Finds the user based on their username
      currUser = await User.findOne({ username : currUser.username });
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

    const user = await registerViaGoogle(googleProfile);

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


// Called when signing in with Lichess
const lichessSignIn = async (accessToken, refreshToken, lichessProfile, done) => {
  
  try {
    let user = null;
    let profile = null;
    let error = null;

    // Finds the user based on their email
    const resp = await axios.get('https://lichess.org/api/account/email', {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    lichessProfile.email = resp.data.email;

    profile = await Profile.findOneAndUpdate({ lichess: lichessProfile.email }, {
      $set: { lichess: lichessProfile.url }
    });

    if (profile) {
      // Return user obj for associated profile
      user = await User.findOne({ username: profile.username });
      error = user || new Error(`Unable to find user linked to Profile ${profile.username}`);
    } else {
      // Create new user and profile obj
      user = await registerViaLichess(lichessProfile);
      error = error || new Error(`Unable to create new user with LichessProfile ${lichessProfile.username}`);
    }

    if (user) return done(null, user);
    else return done(error, false);
  }
  catch (err) {
    return done(err, false);
  }

};

// Called when signing in with Pbchess
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

  } catch (err) {
    return res.json({ success: false, msg: err });
  }

};


// Verifies user via registered email
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

// Called after signing in with Lichess
const lichessSignInCallback = (req, res) => {
  let payload = {};
  let text = "Authentication ";

  if (req.user) {
    const user = req.user;
    const tokenObject = utils.issueJWT(user);
    payload = {
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      username: user.username,
      _id: user._id,
    };
    text += "successfull";
  } else {
    payload = {
      success: false,
      message: "Authentication failed"
    };
    text += "failed";
  }
  const html = `
      <!DOCTYPE html>
      <html>
          <head>
          <title>${text}</title>
          </head>
          <body>
          ${text}.
          <script type="text/javascript">
              window.opener.postMessage(${JSON.stringify(payload)}, "${CLIENT_URL}");
              window.close();
          </script>
          </body>
      </html>
  `;
  res.set("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
  return res.send(html);
};


/* Following 3 function handle the password changes
UpdatePassword : Resets the user password(validates the old password first)
ResetLink : Sends reset link via email to the user
ResetPassword : Resets the user password
*/

// Update password for existing user
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

    await savePassword(newPassword, userId);

    
    return res.json({
      success: true,
      msg: "You have successfully updated your password. Please login to continue."
    })
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Server error" });
  }

};

//Sends a reset link to user via email
const resetLink = async (req, res) => {

  const email = req.body.email;

  const profile = await Profile.findOne({ email : email })

  if(!profile){
    return res.json({
      msg: "No account was registered with the given mail address"
    })
  }
  
  const user = await User.findOne({ username : profile.username });
  const token = utils.issueJWT(user, '5m').token.split(" ")[1];

  const message = `Click <a href =${CLIENT_URL}/password/reset?token=${token}&id=${user._id}>here</a> to reset your password. `;

  await sendMail(email, 'Reset Password', message);

  return res.json({
    msg: "Email sent successfully"
  })

};

// Resets the user password
const resetPassword = async (req, res) => {

  try{
    const password = req.body.password;
    const id = req.body.id;
    if(!id){
      return res.json({
        msg: "Verification Error."
      })
    }
    const user = await savePassword(password, id);

    if(!user){
      return res.json({
        msg: "Verification Error."
      })
    }

    return res.json({
      msg: "Password updated successfully."
    })
  }catch(error){

    console.log(error);
    return res.json({
      msg: error
    })
  }

};

module.exports = {
	login,
  register,
  googleSignIn,
  lichessSignIn,
  lichessSignInCallback,
  confirm,
  updatePassword,
  resetLink,
  resetPassword,
};
