const crypto = require('crypto');
const fs = require('fs');

/* Run this script using
  > node keys.service.js
  to generate the key pair
  for asymmetric encryption
*/
function genKeyPair() {

  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // Number of bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  // Create the public-key file and convert it into .env variables
  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

  // Create the private-key file and convert it into .env variables
  fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);

}

if ( process.argv[2] === 'generate' ) {
  // If the Command Line arguments contain the "generate" key, call the genKeyPair() function
  genKeyPair();

} else {
  // Otherwise export it
  module.exports = genKeyPair;
}

