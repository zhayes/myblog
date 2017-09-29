var express = require('express');
var router = express.Router();
const url = require('url');

const getArticleDetail = require('../bao').getArticleDetail;
const getCommentList = require('../bao').getCommentList

var ObjectId = require('mongodb').ObjectID;

router.get('/', function (req, res) {

  const _id = url.parse(req.url, true).query.id;

  const articleData = new Promise(function (resolve, reject) {//查询文章数据
    getArticleDetail(global.db, {
      '_id': ObjectId(_id)
    }, function (err, article) {
      if (err) {

        res.send('错误数据')
        return;
      }
      resolve(article)
    })
  })

  const commentData = function (article) {//查询评论数据
    return new Promise(function (resolve,reject) {
      getCommentList(global.db, {
        articleId: _id
      }, function (err, comment) {
        if (err) {

          res.send({
            status: 401,
            message: '数据请求失败',
          })
          return;
        }

        global.app.locals.title = article[0].title;

        resolve({
          article: article[0],
          commentList: comment
        })

      })
    })
  }

  articleData
    .then(function (article) {
      return commentData(article);
    })
    .then(function (data) {
      res.render('articleDetail', data);
    }).catch(function(err){
      res.send(err);
    })

});

module.exports = router;
