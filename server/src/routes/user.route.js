const { Router } = require('express');
const passport = require('passport');
const { login, register, googleSignIn, confirm, updatePassword } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients
userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/signin/google', googleSignIn);
userRouter.post('/confirm', confirm);
userRouter.put('/update-pswd', passport.authenticate('jwt', { session: false }), updatePassword);

module.exports = userRouter;
