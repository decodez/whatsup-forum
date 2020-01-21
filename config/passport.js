const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackURL: '/api/users/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ 'google.id': profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            google: {
              id: profile.id,
              token: accessToken,
            },
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackURL: '/api/users/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
      proxy: true,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }).then(existingUser => {
        console.log(profile);
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            facebook: {
              id: profile.id,
              token: accessToken,
            },
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ 'local.username': username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);
