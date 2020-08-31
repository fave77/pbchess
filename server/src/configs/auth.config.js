const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const PRIV_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const PUB_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

const createHash = (pswd, salt) => {
  return crypto
    .pbkdf2Sync(pswd, salt, 10000, 64, 'sha512')
    .toString('hex');
};

const createPassword = pswd => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = createHash(pswd, salt);

  return {
    salt,
    hash
  };
};

const checkPassword = (pswd, hash, salt) => hash === createHash(pswd, salt);

const issueJWT = user => {
  const { _id } = user;
  const expiresIn = '1d';

  const payload = {
    id: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}

const configPassport = passport => {
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
  createPassword,
  checkPassword,
  issueJWT,
  configPassport
};
