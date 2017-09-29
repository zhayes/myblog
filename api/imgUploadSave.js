var path = require('path');
var express = require('express');
var multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './dist/public/upload/img')
    },  
    //获取添加后缀名,给上传文件重命名
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}${Date.now()}${ext}`);
    }
});

var upload = multer({storage:storage});

// 允许多图上传；最多可同时上传8张；
module.exports = function(app){
    app.post('/upload_imgData', upload.array('upload_img',8), function(req, res, next){
        console.log(req);
        const urlArray = req.files.map(function(o,i){
            return 'upload/img/'+o.filename
        })
        res.send({status:200,urlArray:urlArray});
    });
}