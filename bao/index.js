

module.exports = {
    //获取文章列表数据；
    getArticleList: function (db, data, callback) {
        const collection = db.collection('article');
        collection.find().sort({ time: -1 }).skip((data.page-1)*10).limit(10).toArray(function (err, result) {
            console.log(callback);
            callback(err, result);
        })
    },

    //获取文章详情数据
    getArticleDetail: function (db, data, callback) {
        const collection = db.collection('article');
        collection.find(data).toArray(function (err, result) {
            callback(err, result);
        })
    },

    //获取文章评论列表数据；
    getCommentList: function (db, data, callback) {
        const collection = db.collection('commentsList');
        collection.find(data).sort({ time: -1 }).toArray(function (err, result) {
            callback(err, result);
        })
    },

    //保存文章上传数据；
    saveArticleData: function (db, data, callback) {
        const collection = db.collection('article');
        collection.insert(data, function (err, result) {
            callback(err, result);
        })
    },


    //保存评论数据；
    saveCommentData: function (db, data, callback) {
        const collection = db.collection('commentsList');
        collection.insert(data, function (err, result) {
            callback(err, result);
        })
    },

    //获取账号数据
    getUserData: function (db, data, callback) {
        const collection = db.collection('account');
        collection.findOne(data, function (err, result) {
            callback(err, result);
        })
    },

    //注册账号
    registerAccount: function (db, data, callback) {
        const collection = db.collection('account');
        collection.insert(data, function (err, result) {
            callback(err, result);
        })
    }
}
