var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();

app.use(session({ secret: 'MYSUPERSECRETWITHLOTSOFCHARACTERSSECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.send('<a href="/authenticate">Continue to login</a>');
});

app.get('/authenticate', function(req, res, next) {
  // Put authentication code
});

app.get('/authenticate/callback', function(req, res, next) {});

app.get('/display', function(req, res, next) {
  if (req.user) {
    res.send('You are ' + req.user.displayName + ', and I claim my $1 million');
  } else {
    res.redirect('/authenticate');
  }
});

app.listen(8080);
