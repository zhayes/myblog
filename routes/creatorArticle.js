var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  global.app.locals.title = '创建文章';
  res.render('creatorArticle');
});

module.exports = router;
