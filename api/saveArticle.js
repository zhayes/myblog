const saveArticleData = require('../bao').saveArticleData;

const api = [
    {
        method: 'post',
        body: {
            title:'',
            contentHtml:'',
            contentTxt:'',
            time:''
        },
        path: '/save_article',
        description: '保存文章接口',
        callback: function (req, res) {
            console.log(req.body);
            if(!req.body.title.trim() || !req.body.contentHtml.trim() || req.body.contentHtml == '<p><br></p>'){
                res.send({status:401,message:'标题或文章内容不能为空，保存被拒！'});
            }else{
                saveArticleData(global.db,{
                    title:req.body.title,
                    contentHtml:req.body.contentHtml,
                    contentTxt:req.body.contentTxt,
                    time:Date.now(),
                },function(err,result){
                    if(err){
                        console.log(err);
                        res.send({
                            status:401,
                            message:'数据请求失败',
                        })
                        return;
                    }
                    res.send({status:200,message:'保存成功',data:result.ops[0]});
                })
            }
        }
    }
]

module.exports = api 
