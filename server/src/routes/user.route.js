const { Router } = require('express');
const { login, register, signIn, confirm } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/signin/google', signIn);
userRouter.post('/confirm', confirm);

module.exports = userRouter;
