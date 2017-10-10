var express = require('express');
var router = express.Router();
const getArticleList = require('../bao').getArticleList;




router.get('/', function (req, res) {

  var $page = req.query.page ? req.query.page : 1;

  var splicePageData = new Promise(function (resolve, reject) {//查询 分页数据；
    getArticleList(global.db, { page: $page }, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })

  var totalPageData = function (data) {//查询总页数
    return (
      new Promise(function (resolve, reject) {
        const collection = db.collection('article');

      	collection.find().count(function(err,total){
	    console.log(total);
       	    resolve({
                totalPage: (total % 10) == 0 ? total / 10 : (Math.floor(total / 10)) + 1,
                result: data
       	    });
	})
      })
    )
  }

  splicePageData.then(function (result) {

    return totalPageData(result);

  }).then(function (data) {
    global.app.locals.title = '博客';

    res.render('index', {
      articleList: data.result,
      currentPage: $page,
      totalPage: data.totalPage
    })

  }).catch(function (err) {
    res.render('index', {
      articleList: [],
      currentPage: 1,
      totalPage: 0
    })
  });


});

module.exports = router;




