// var http = require('http');

// //var handler = ({ path: '/reviewpushcode', secret: 'zhablog' });
// var exec = require('child_process').exec;

// function run_cmd() {
//     exec('git pull origin master',function(err,stdout,stderr){
//         if(err){
//             console.log(err);
//             return;
//         }
//         console.log(stdout);
//         exec('pm2 restart all',function(err,stdout,stderr){
//             if(err){
//                 consol.log(err)
//                 return;
//             }
//             console.log(stdout);
//         });
//     })
// }
 
// http.createServer(function (req, res) {
//     if(req.url === '/reviewpushcode' && req.method === ''){
//         console.log(req);
//         res.write('ok');
//         res.end();
//     }
// }).listen(3389,function(){
//     console.log('webhook is running on 3389...');
// })
 
var http = require('http')
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/reviewpushcode', secret: 'zhablog' })
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(3389,function(){
    console.log('webhook is running on 3389...');
})
 
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
 
handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})