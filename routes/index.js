var express = require('express');
var router = express.Router();
const getArticleList = require('../bao').getArticleList;




router.get('/', function(req, res) {
  
  var $page = req.body.page ? req.body.page : 1;

  getArticleList(global.db,{page:$page}, function (err, result) {
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




  