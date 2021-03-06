'use strict';

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'rachelandyoonahrock' // or whatever you like
}));

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('session data', req.session);
  next();
});
app.use('/api', require('../api/api.router'));

app.post('/login', function(req, res, next) {
  User.findOne({
    where: req.body
  })
  .then( function(foundUser) {
    if (foundUser) {
      req.session.userId = foundUser.id
      console.log('LOGIN session data', req.session);
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  })
  .catch(next)
})

app.post('/signUp', function(req, res, next) {
  User.findOrCreate({
    where: req.body
  })
  .spread( function(foundOrCreatedUser, created) {
      if (created){
        req.session.userId = foundOrCreatedUser.id
        res.sendStatus(204)
      }
      else {
        res.status(401).send('User already created')
      }

  })
  .catch(next)
})

app.get('/logout', function(req, res, next) {
    delete req.session;
    console.log('LOGOUT session data', req.session);
    res.redirect('https://http.cat/305', 204)
})

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
