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

app.use('/', mainpage);

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});


module.exports = app;
