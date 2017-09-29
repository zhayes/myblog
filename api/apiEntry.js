
var path = require('path');

const apiEntry = {
    'login': require('./login'),
    'logOut':require('./logOut'),
    'register': require('./register'),
    'saveArticle': require('./saveArticle'),
    'getArticleList': require('./getArticleList'),
    'articleDetail': require('./articleDetail'),
    'submitComment': require('./submitComment'),
    'getCommentList': require('./getCommentList')
}

module.exports = function (app) {
    for (var api in apiEntry) {

        if (Object.prototype.toString.call(apiEntry[api]) != '[object Array]') {//类型错误提示，apiEntry键值对的值应该是个数组；
            throw (new Error('错误,TypeError,apiEntry[' + api + ']shold be a Array in ' + __filename));
        }

        var apiItem = apiEntry[api];

        for (var item = 0; item < apiItem.length; item++) {
            var express = require('express');
            var router = express.Router();

            router[apiItem[item].method]('/', apiItem[item].callback);

            app.use(apiItem[item].path, router);
        }
    }
}