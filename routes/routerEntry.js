const index = require('./index'),
    articleDetail = require('./articleDetail'),
    creatorArticle = require('./creatorArticle'),
    account = require('./account');

const uploadImg = require('../api/imgUploadSave');

module.exports = function(app){
    app.use(function(req,res,next){
	app.locals.user = req.session.userName ? req.session.userName: '' ;
	next();
    })

    //图片上传
    uploadImg(app);
    
    app.use('/', index);
    app.use('/index.html', index);
    app.use('/articleDetail.html', articleDetail);
    app.use('/creatorArticle.html', creatorArticle);
    app.use('/account.html', account);

}
