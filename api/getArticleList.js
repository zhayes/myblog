const getArticleList = require('../bao').getArticleList;

const api = [
    {
        method: 'get',
        body: {
            id: ''
        },
        path: '/get_article_list',
        description: '获取文章列表',
        callback: function (req, res) {

            var $page = req.body.page ? req.body.page : 1;

            getArticleList(global.db, { page: $page }, function (err, result) {
                if (err) {
                    console.log(err)
                    res.send({
                        status: 401,
                        message: '数据请求失败',
                    })
                    return;
                }
                res.send({
                    status: 200,
                    message: '获取数据成功',
                    data: result
                });
            })

        }
    }
]

module.exports = api