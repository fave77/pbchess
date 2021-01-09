const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const PUB_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

const configAuth = passport => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };

  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.id}, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      else return done(null, false);
    });
  }));

};

module.exports = {
  configAuth
};
