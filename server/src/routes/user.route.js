const { Router } = require('express');
const { login, register, signIn } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients
userRouter.post('/login', login);
userRouter.post('/register', register);

// Router for handing signin using google
userRouter.post('/signin/google', signIn);
module.exports = userRouter;
