console.log(" coming to signUpSuer");
var express = require('express');
const _ = require('lodash');
var User = require('../models/user');
var mongoose = require('../db/dbconnection');

var router = new express.Router();

router.get('/', (req, res) => {
  //res.sendStatus(200);
  res.render('mainpage', {title: 'Welcome to Gusto!'});
});

router.post('/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
     return user.generateAuthToken();
   }).then((token) => {
     res.header('x-auth',token).send(user);
   }).catch((e) => {
     res.status(400).send(e);
   })
});

module.exports = router;
