const { Router } = require('express');
const { fetchGameDetails } = require('../controllers/game.controller');
const gameRouter = Router();

// Game router for handling requests from clients
gameRouter.post('/fetch-game', fetchGameDetails);

module.exports = gameRouter;
