var express = require('express');
const _ = require('lodash');
var User = require('../models/user');
var mongoose = require('../db/dbconnection');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('mainpage', {title: 'Welcome to Gusto!'});
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {title: 'Welcome to dashboard page !'});
});

router.get('/login', (req, res) =>{
  res.render('loginPage', {title: 'Login In !'});
})

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      //res.render('login.jade', { error: 'Invalid email or password.' });
      res.status(400).send();
    } else {
      if (req.body.password === user.password) {
        // sets a cookie with the user's info
        console.log(" User :" + user);
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('login.jade', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.post('/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((user) => {
    req.session.user = user;
    res.redirect('/dashboard');
  }).catch((e) =>{
    res.status(400).send(e);
  });
});

/*router.get('/dashboard', (req, res) => {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        // expose the user to the template
        res.locals.user = user;

        // render the dashboard page
        res.render('dashboard', {title: 'Welcome to dashboard page !'});
      }
    });
  } else {
    res.redirect('/register');
  }
});*/

module.exports = router;
