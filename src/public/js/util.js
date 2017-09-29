const wangEditor = require('wangeditor');

//获取格式化时间
export const getFormatTime = (pattern='yyyy-mm-dd  hh:ii:ss',timeStamp=(new Date().getTime())) => {
    const date = new Date(timeStamp),
        year = date.getFullYear(),
        month = (date.getMonth() + 1)<10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    let formatString = pattern;

    formatString = formatString.replace('yyyy', year)
        .replace('mm', month)
        .replace('dd', day)
        .replace('hh', hours)
        .replace('ii', minutes)
        .replace('ss', seconds);

    return formatString;
}

//获取 url search参数；
export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//初始化王福朋 富文本编辑器
export const initWangEditor = (option) => {
    //富文本相关配置
    const _this = this;
    const editor = new wangEditor(option.barSwrap,option.contentSwrap);
    //editor.customConfig.uploadImgShowBase64 = true;

    editor.customConfig.uploadImgHeaders = {
        'Accept': 'multipart/form-data'
    };

    editor.customConfig.uploadImgServer = '/upload_imgData';//后台接收的上传图片的接口

    editor.customConfig.uploadFileName = 'upload_img';//上传的图片字段

    editor.customConfig.uploadImgMaxLength = 8//最多可同时上传8张，后台限制也是最多只能接收8张

    editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
        },
        success: function (xhr, editor, result) {
            console.log(result, '成功')
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
            console.log(result)
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
            alert('上传出错！')
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var urlArray = result.urlArray;
            urlArray.forEach(function (element) {
                insertImg(element)
            }, this);

            // result 必须是一个 JSON 格式字符串！！！否则报错
        }
    }


    editor.customConfig.menus = [//编辑栏配置
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        //'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]

    editor.create();
    editor.txt.clear();
    return editor; 
}