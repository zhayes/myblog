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
            req.session.failMessageRegister = '';
            if (!req.body.user.trim() || !req.body.pwd.trim()) {
                req.session.failMessage = '请输入完整的账号密码';
                res.redirect('/account.html')
                return;
            }

            getUserData(global.db, {
                user: req.body.user.trim(),
                password: md5(req.body.pwd.trim())
            }, function (err, result) {
                if (err || !result) {
                    req.session.failMessage = '账号或密码错误';
                    res.redirect('/account.html')
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
