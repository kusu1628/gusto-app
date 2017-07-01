var express = require('express');
const _ = require('lodash');
var User = require('../models/user');
var mongoose = require('../db/dbconnection');
var router = express.Router();

// need to move this to middleware
// redirect with some msg
function requireLogin (req, res, next) {
  console.log('User : ' + req.user);
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('mainpage', {title: 'Welcome to Gusto!'});
});


router.get('/dashboard', requireLogin, (req, res) => {
  res.render('dashboard', {title: 'Welcome to dashboard page !'});
});

router.get('/login', (req, res) =>{
  res.render('loginPage', {title: 'Login In !'});
})

router.post('/loginusr', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('loginPage.jade', { error: 'Invalid email or password.' });
      //res.status(400).send();
    } else {
      if (req.body.password === user.password) {
        // sets a cookie with the user's info
        console.log(" User :" + user);
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        console.log(" Coming to login failure ");
        res.render('loginPage.jade', { error: 'Invalid email or password!!! ' });
      }
    }
  });
});

// To Do's need to modify for more field to save
// as of now just saving email and password
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

// To Do's need to make a button loout in  dashboard.jade
router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;
