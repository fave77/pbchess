const { Router } = require('express');
const { login, register } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients
userRouter.post('/login', login);
userRouter.post('/register', register);
module.exports = userRouter;
