var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.sendStatus(200);
  //res.render('mainpage', {title: 'Welcome to Gusto!'});
});

module.exports = router;
