/* Auth configuration */

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LichessStrategy = require('passport-lichess')
const axios = require('axios');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');

const PUB_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
const LICHESS_CLIENT_ID = process.env.LICHESS_CLIENT_ID.replace(/\\n/g, '\n');
const LICHESS_CLIENT_SECRET = process.env.LICHESS_CLIENT_SECRET.replace(/\\n/g, '\n');

const configAuth = passport => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };
  
    passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
      User.findOne({_id: jwt_payload.id}, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }));

  const lichessOptions = {
    clientID: LICHESS_CLIENT_ID,
    clientSecret: LICHESS_CLIENT_SECRET,
    callbackURL: '/api/auth/lichess/callback',
    scope: ['email:read']
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(e => done(new Error("Failed to deserialize user")));
  })

  // Find/Create a new user
  passport.use(new LichessStrategy(lichessOptions, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    // Retrieve the email address
    try {
      console.log("Requesting email...")
      const resp = await axios.get('https://lichess.org/api/account/email', {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      const email = resp.data.email;
      console.log("Got email ", email)
      console.log("Checking if profile exists")
      //done(null, false)
      const profile = await Profile.findOne({email: email});
      
      if (!profile) {
        // Create a new user
        console.log("TODO: Create a new user");
        return done(null, false);
      }
      else /*if (user.lichess === profile.id)*/ {
        // Find and return the `User` object
        console.log("Found profile, returning user")
        const user = await User.findOne({username: profile.username});
        console.log("Found user", user, ", calling done()")
        if (user) return done(null, user);
        else return done(null, false);
      }
      // else {
      //   // LichessID needs to be linked in settings
      //   console.log("TODO: Link lichess ID to Profile object");
      //   return done(null, false);
      // }
    }
    catch(err) {
      console.log("Got an error", err)
    }
  }));

};

module.exports = {
  configAuth
};
