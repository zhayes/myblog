var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  if(req.session.isLogin && req.session.isLogin==='1'){
    res.redirect('/')
    return;
  }
  global.app.locals.title = '登录注册'
  global.app.locals.failMessage = req.session.failMessage;
  global.app.locals.failMessageRegister = req.session.failMessageRegister;
  res.render('account.html');
});

module.exports = router;
