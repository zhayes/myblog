var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  
  console.log(req.params.param);

  if(req.session.isLogin && req.session.isLogin==='1'){
    res.redirect('/')
    return;
  }
  global.app.locals.title = '登录注册'
  res.render('account.html');

});

module.exports = router;
