var express = require('express');
var passport = require('passport');

var app = express();

app.get('/', function(req, res) {
  res.send('Server works');
});

app.listen(8080);
