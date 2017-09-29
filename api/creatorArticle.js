const saveArticleData = function(){
    const db = gloabl.db;
}

const api = [
    {
        method: 'post',
        body: {
            title: '',
            content: '',
            imgs: [],//前端暂时没有上传这个字段
            timeStamp: ''//后台自动添加时间戳保存到数据库
        },
        path: '/submit_to_creatorArticle',
        description: '发布文章接口',
        callback: function (req, res) {
            console.log(req.body)
            const title = req.body.title.trim();
            const content = req.body.content.trim();
            const responseText = {
                status:200,
                message:'保存成功'
            } 
            if(!title || !content){
                responseText.status = 401;
                responseText.message = '标题或文章内容不能为空,保存被拒绝！'
                res.send(responseText)
            }else{
                res.send(responseText)
            }
        }
    }
]

module.exports = api