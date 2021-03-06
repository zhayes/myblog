var http = require('http')
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/reviewpushcode', secret: 'zhablog' })
var exec = require('child_process').exec;

function run_cmd() {
    exec('git pull origin master', function (err, stdout, stderr) {//拉取主分支代码
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
        exec('webpack', function (err, stdout, stderr) {//进行webpack编译
            if (err) {
                console.log(err)
                return;
            }
            console.log(stdout);

            exec('pm2 restart www', function (err, stdout, stderr) {//重启网站服务器
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(stdout);
            });
        })

    })
}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })

}).listen(3389, function () {
    console.log('webhook is running on 3389...');
})

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    run_cmd();
})

handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})
