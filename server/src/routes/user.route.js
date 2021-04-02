const { Router } = require('express');
const passport = require('passport');
const { login, register, googleSignIn, lichessSignInCallback, confirm, updatePassword, resetLink, resetPassword } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients
userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/signin/google', googleSignIn);
userRouter.get('/signin/lichess', passport.authenticate('lichess'));
userRouter.get('/signin/lichess/callback', passport.authenticate('lichess', { session: false }), lichessSignInCallback);
userRouter.post('/confirm', confirm);
userRouter.post('/password/email', resetLink);
userRouter.put('/password/reset', passport.authenticate('jwt', { session: false }), resetPassword);
userRouter.put('/password/update', passport.authenticate('jwt', { session: false }), updatePassword);

module.exports = userRouter;
