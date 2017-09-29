const registerAccount = require('../bao').registerAccount;

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
            pwd: '',
            confirmPwd: ''
        },
        path: '/submit_to_register',
        description: '注册接口',
        callback: function (req, res) {

            const user = req.body.user.trim(),
                pwd = req.body.pwd.trim(),
                confirmPwd = req.body.confirmPwd.trim();

            global.app.locals.failMessage = '';

            if(!pwd || !user){
                global.app.locals.failMessageRegister= "请输入完整的注册账号密码";
                res.redirect('/account.html#regiseter')
                return;
            }

            if (pwd != confirmPwd) {
                global.app.locals.failMessageRegister= "两次密码不一致";

                res.redirect('/account.html#register')
                return;
            }

            registerAccount(global.db, {
                user: user,
                password: md5(pwd),
                time: Date.now()
            }, function (err, result) {
                if (err) {
                    global.app.locals.failMessageRegister= "注册失败";
                    res.redirect('/account.html#register')
                    return;
                }

                res.redirect('/account.html')

            });
        }
    }
]

module.exports = api