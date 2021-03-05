/* Database configuration */

const { connect, connection } = require('mongoose');
const prodMongoURI = process.env.PROD_DATABASE_URI || '';
const devMongoURI = process.env.DEV_DATABASE_URI || '';

const configDB = _ => {
  const mongoURI = (process.env.NODE_ENV === 'production')
    ? prodMongoURI
    : devMongoURI;

  connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  connection.once('open', _ =>
    console.log('Database connected ==> ', mongoURI)
  );

  connection.on('error', err =>
    console.error('Database Connection Error!\n', err)
  );

};

module.exports = {
  configDB
};
