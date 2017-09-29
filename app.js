var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var routerEntry = require('./routes');
var apiEntry = require('./api');

var app = express();

global.app = app;

const MongobdClient = require('mongodb').MongoClient;
const DB_CONN_STR  = 'mongodb://localhost:27017/myblog';

//链接数据库
MongobdClient.connect(DB_CONN_STR,function(err,db){
    if(err){
        console.log(err);
        return;
    }
    console.log('数据库链接成功,链接地址为 ',DB_CONN_STR);
    global.db = db;//将数据库对象加入到全局作用域；
})

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Use the session middleware 
app.use(session({ 
    secret: 'secret',
    cookie: { maxAge: 1000 * 60 * 60 * 0.5 },//登陆状态维持 半小时
    rolling: true,
    resave: true,
    saveUninitialized: true
  })
)

//静态文件目录
app.use(express.static(path.join(__dirname, 'dist/public')));

app.use(function(req,res,next){//判断是否登录
  if((req.url=='/creatorArticle.html'||req.url=='/save_article') && req.session.isLogin!='1'){
    res.redirect('/account.html');
    return;
  }
  next();
})

app.locals.moment = require('moment');
app.locals.user = '';
app.locals.failMessage= '';
app.locals.failMessageRegister= '';

//路由入口
routerEntry(app);

//api接口入口
apiEntry(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
