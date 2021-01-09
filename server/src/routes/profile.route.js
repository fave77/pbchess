const { Router } = require('express');
const passport = require('passport');
const { fetchProfile, updateProfile } = require('../controllers/profile.controller');
const profileRouter = Router();

profileRouter.get('/fetch-profile', fetchProfile);
profileRouter.put('/update-profile', passport.authenticate('jwt', { session: false }), updateProfile);
module.exports = profileRouter;
