require('./config/dbconfig');
const path = require('path');
const express = require('express');
const session = require('client-sessions');
const _ = require('lodash');
var User = require('./models/user');
var user = require('./routes/user-router');
var mainpage = require('./routes/mainPageRoute');
var cookieParser = require('cookie-parser')


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const bodyParser = require('body-parser');
console.log('publicPath : ' + publicPath);

app.use(express.static(publicPath));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.set('views', path.join(__dirname , '../public/views'));
app.set('view engine', 'jade');


//routing requests
//app.use('/', mainpage);
//app.use('/user', user);
//app.use('/signUpUser', signUpUser);

app.get('/', (req, res) => {
  res.render('mainpage', {title: 'Welcome to Gusto!'});
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {title: 'Welcome to dashboard page !'});
});

app.post('/login', function(req, res) {
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

app.post('/users/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((user) => {
    console.log("user : " + user);
    req.session.user = user;
    res.redirect('/dashboard');
  }).catch((e) =>{
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});


module.exports = app;
