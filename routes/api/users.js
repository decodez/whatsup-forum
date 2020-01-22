const passport = require('passport');
const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/test', (req, res) => {
  res.send('Auth Working properly');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

router.post('/signup', (req, res) => {
  // Form validation

  const { name, username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ 'local.username': username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    }
    const newUser = new User({
      name: name,
      'local.username': username,
      'local.password': password,
    });
    newUser.save((err, user) => {
      if (err) return res.json(err);
      return res.json(user);
    });
  });
});

module.exports = router;
