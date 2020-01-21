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
    console.log(req);
    res.send(req.user);
});

module.exports = router;
