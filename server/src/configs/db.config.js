/* Database configuration */

const { connect, connection } = require('mongoose');
const prodMongoURI = process.env.PROD_DATABASE_URL || '';
const devMongoURI = process.env.DEV_DATABASE_URL || '';

const configDB = _ => {
  const mongoURI = (process.env.NODE_ENV === 'production')
    ? prodMongoURI
    : devMongoURI;

  try {
    connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error('Initial Database Connection Error!', err);
  }

  connection.on('connected', _ =>
    console.log('Database connected ==> ', mongoURI)
  );

  connection.on('error', err =>
    console.error('Database Connection Error!\n', err)
  );

};

module.exports = {
  configDB
};
