var express = require('express');
var router = new express.Router();

router.get('/user', function (req, res) {
  res.send('here is the user');
});

router.post('/user', function (req, res) {
  res.send('user created');
});

var app = express();
app.use(router);
app.listen(3000);
