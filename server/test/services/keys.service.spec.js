const genKeyPair = require('../../src/services/keys.service');
const fs = require('fs').promises;
const crypto = require('crypto');

//function to delete the given file
async function deleteFile( filePath ) {
    await fs.unlink(filePath);
}

// Asynchronous function to validate the keys
async function validateKeys( callback ) {

    // Read the private key
    const private_key = await fs.readFile( 'src/services/id_rsa_priv.pem' );

    // Read the public key with utf-8 encoding
    const public_key = await fs.readFile( 'src/services/id_rsa_pub.pem', { encoding: "utf-8"} );

    /* Check if the same public key can be generated from the read private key */

    // Generate a KeyObject with type "public" from the read private key
    const generated_public_keyObject = crypto.createPublicKey( private_key );

    // Create a pem format string from the received generated_public_keyObject 
    const result = generated_public_keyObject.export( {
        type: "pkcs1",
        format: "pem"
    });

    callback( result, public_key );
}

// executes after all the testing is done
afterAll( () => {
    deleteFile('src/services/id_rsa_priv.pem');
    deleteFile('src/services/id_rsa_pub.pem');
});

test( 'genKeyPair does not throw any error', () => {
    expect( () => {
        genKeyPair();
    }).not.toThrow();

});

test( 'private and public keys are valid', done => {
    
    validateKeys( ( result, public_key) => {
        
        expect(result).toEqual(public_key);
        done();
    });
    
});