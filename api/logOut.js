const api = [
    {
        method: 'get',
        path: '/logOut',
        body:{
            
        },
        description: '登出接口',
        callback: function (req, res) {
            console.log('退出');
            req.session.destroy();
            global.app.locals.user = '';
            res.redirect('/account.html')
        }
    }
]

module.exports = api