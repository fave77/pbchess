/* Auth configuration */

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LichessStrategy = require('passport-lichess');
const User = require('../models/user.model');
const { lichessSignIn } = require('../controllers/user.controller');

const PUB_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

const LICHESS_CLIENT_ID = (process.env.NODE_ENV === 'production')
  ? process.env.PROD_LICHESS_CLIENT_ID.replace(/\\n/g, '\n')
  : process.env.DEV_LICHESS_CLIENT_ID.replace(/\\n/g, '\n');

const LICHESS_CLIENT_SECRET = (process.env.NODE_ENV === 'production')
  ? process.env.PROD_LICHESS_CLIENT_SECRET.replace(/\\n/g, '\n')
  : process.env.DEV_LICHESS_CLIENT_SECRET.replace(/\\n/g, '\n');

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
    callbackURL: '/api/signin/lichess/callback',
    scope: ['email:read']
  };

  passport.use(new LichessStrategy(lichessOptions, lichessSignIn));

};

module.exports = {
  configAuth
};
