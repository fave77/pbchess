const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/api/1', (req, res) => {
	res.json({
		message: "hello"
	});
});

module.exports = app;
