const wangEditor = require('wangeditor');
import { initWangEditor } from './public/js/util.js';

var editor = initWangEditor({ barSwrap: '#wangEditorBar', contentSwrap: '#wangEditorBox' });
function postArticle() {
    
    $.ajax({
        url: '/save_article',
        dataType: 'json',
        type: 'post',
        data: {
            title: document.getElementById('articleTitle').value,
            contentHtml: editor.txt.html()
        },
        success: function (res) {
            alert(res.message);
            if (res.status == 200) {
                location.href = '/';
            }
        }
    })
}

document.getElementById('PostArticleBtn').onclick = postArticle;