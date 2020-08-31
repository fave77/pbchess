const { Router } = require('express');
const passport = require('passport');
const { login, register, demo } = require('../controllers/user.controller.js');
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/demo', passport.authenticate('jwt', { session: false }), demo);
module.exports = userRouter;
