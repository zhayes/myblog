const saveCommentData = require('../bao').saveCommentData;

const api = [
    {
        method: 'post',
        body: {
            
        },
        path: '/submit_comment',
        description: '文章评论接口',
        callback: function (req, res) {

            if(!req.body.commentTxt.trim()){
                res.send({status:401,message:'评论内容不能为空，保存被拒！'});
            }else{
                const time = Date.now();
                saveCommentData(global.db,{
                    articleId:req.body.articleId,
                    commentTxt:req.body.commentTxt,
                    time:time
                },function(err,result){
                    console.log(result);
                    if(err){
                        console.log(err);
                        res.send({
                            status:401,
                            message:'评论成功失败',
                        })
                        return;
                    }
                    res.send({status:200,message:'评论成功',comment:result.ops[0]});
                })
            }
        }
    }
]

module.exports = api 
