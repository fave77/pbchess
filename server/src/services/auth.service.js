const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

// Creating a hash from pswd and salt
const createHash = (pswd, salt) => {
  return crypto
    .pbkdf2Sync(pswd, salt, 10000, 64, 'sha512')
    .toString('hex');
};

// Converting plain-text based pswd into a unique hash and salt
const createPassword = pswd => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = createHash(pswd, salt);

  return {
    salt,
    hash
  };
};

// Checking plain-text pswd against an existing hash
const checkPassword = (pswd, hash, salt) => hash === createHash(pswd, salt);

// Creating a JWT for authenticated routes
const issueJWT = (user, expiry='1d') => {
  const { _id } = user;
  const expiresIn = expiry;

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

module.exports = {
  createPassword,
  checkPassword,
  issueJWT
};
