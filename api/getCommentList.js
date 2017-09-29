const getCommentList = require('../bao').getCommentList;

var url = require('url');
const api = [
    {
        method: 'get',
        body: {
            id: ''
        },
        path: '/get_comment_list',
        description: '获取文章列表',
        callback: function (req, res) {
            const id = url.parse(req.url,true).query.id;
            console.log(id,'文章id');
            getCommentList(global.db, {
                articleId:id
            },function (err, result) {
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