const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

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

module.exports = {
  createPassword,
  checkPassword,
  issueJWT
};
