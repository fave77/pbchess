const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const socket = require('socket.io');


const { configDB } = require('./configs/db.config');
const { configPassport } = require('./configs/auth.config');
const { configSocket } = require('./configs/socket.config');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

configDB();
configPassport(passport);
app.use(passport.initialize());

app.use('/api', require('./routes/user.route'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is Live!\nListening on port: ${port}`);
});

configSocket(socket(server));

module.exports = app;
