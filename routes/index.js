var express = require('express');
var router = express.Router();
const getArticleList = require('../bao').getArticleList;




router.get('/', function(req, res) {
  console.log(res.render)
  getArticleList(global.db, function (err, result) {
    if (err) {
      console.log(err)
      res.send({
        status: 401,
        message: '数据请求失败',
      })
      return;
    }
    global.app.locals.title = '博客';
     res.render('index',{
       articleList:result,
     });
  })
 
});

module.exports = router;




  