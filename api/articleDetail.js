const getArticleDetail = require('../bao').getArticleDetail;

var ObjectId = require('mongodb').ObjectID;
var url = require('url');
const api = [
    {
        method: 'get',
        body: {
            id: ''
        },
        path: '/get_article_detail',
        description: '获取文章详情',
        callback: function (req, res) {

            var _id  = url.parse(req.url,true).query.id;

            getArticleDetail(global.db, {
                '_id':ObjectId(_id)
            }, function (err, result) {
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