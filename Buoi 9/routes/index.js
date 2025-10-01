var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const title = 'Application Title';
  const a = [1, 2, 3, 4, 5];
  res.render('index', {
    title: title,
    a: a
  });
});

module.exports = router;
