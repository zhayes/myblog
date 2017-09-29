const getUserData = require('../bao').getUserData;

const md5 = function (data) {//进行 md5 加密;
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}

const api = [
    {
        method: 'post',
        body: {
            user: '',
            pwd: ''
        },
        path: '/submit_to_login',
        description: '登陆接口',
        callback: function (req, res) {
          
            req.session.isLogin = '0';//默认未登录；
            let responseText = '';
           global.app.failMessageRegister = '';
            if(!req.body.user.trim() || !req.body.pwd.trim()){
                global.app.locals.failMessage = '请输入完整的账号密码';
                res.render('account.html')
                return;
            }

            getUserData(global.db, {
                user: req.body.user.trim(),
                password: md5(req.body.pwd.trim())
            }, function (err, result) {
                if (err || !result) {
                    global.app.locals.failMessage = '账号或密码错误';
                    res.render('account.html')
                } else if (result) {
                    req.session.isLogin = '1';
		    req.session.userName = req.body.user.trim();
                    res.redirect('/')
                }

            })

        }
    }
]

module.exports = api
