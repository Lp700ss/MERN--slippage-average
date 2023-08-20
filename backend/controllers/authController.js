// controllers/authController.js
const passport = require('passport');

const authGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

const authGoogleCallback = passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
});

module.exports = {
  authGoogle,
  authGoogleCallback,
};
