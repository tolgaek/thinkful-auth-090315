var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();

app.use(session({ secret: 'MYSUPERSECRETWITHLOTSOFCHARACTERSSECRET' }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  /**
   * Typical Implementation using Models/DB
    User.create(user, function(err, createdUser) {
      done(null, createdUser.id);
    });
   *
   */
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  /**
   * Typical Implementation using Models/DB
    User.find(userId, function(err, user) {
      done(null, user);
    });
   *
   */
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: 'CLIENTIDHERE',
  clientSecret: 'CLIENTSECRET',
  callbackURL: 'http://127.0.0.1:8060/authenticate/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/', function(req, res) {
  res.send('<a href="/authenticate">Continue to login</a>');
});

app.get('/authenticate', passport.authenticate('google', {
  scope: 'https://www.googleapis.com/auth/userinfo.profile'
}));

app.get('/authenticate/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/display'
}));

app.get('/display', function(req, res, next) {
  if (req.user) {
    res.send('You are ' + req.user.displayName + ', and I claim my $1 million');
  } else {
    res.redirect('/authenticate');
  }
});

app.listen(8060);
