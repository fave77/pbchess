const { Router } = require('express');
const { login, register } = require('../controllers/user.controller');
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
module.exports = userRouter;
