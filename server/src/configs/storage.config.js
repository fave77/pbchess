/* Storage configuration */

const { createClient } = require('redis');
const redisAdapter = require('socket.io-redis');

const prodRedisURI = process.env.PROD_STORAGE_URL || '';
const devRedisURI = process.env.DEV_STORAGE_URL || '';

const prodRedisPswd = process.env.PROD_STORAGE_PSWD;
const devRedisPswd = process.env.DEV_STORAGE_PSWD

const configStorage = io => {

  const redisURI = (process.env.NODE_ENV === 'production')
    ? prodRedisURI
    : devRedisURI;

  const host = redisURI.slice(0, redisURI.indexOf(':'));
  const port = redisURI.slice(redisURI.indexOf(':') + 1);
  const auth_pass = (process.env.NODE_ENV === 'production')
    ? prodRedisPswd
    : devRedisPswd;

  const client = createClient({
    port, host, auth_pass
  });

  client.on('connect', _ =>
    console.log('Storage connected ==> ', redisURI)
  );

  client.on('error', err =>
    console.error('Storage Connection Error!\n', err)
  );

  // Attaching redis-adapter to the socket for scaling the storage across multiple processes and machines
  const pubClient = client;
  const subClient = pubClient.duplicate();
  io.adapter(redisAdapter({ pubClient, subClient }));

  return client;

};

module.exports = {
  configStorage
};
