var http = require('http');

//var handler = ({ path: '/reviewpushcode', secret: 'zhablog' });
var exec = require('child_process').exec;

function run_cmd() {
    exec('git pull origin master',function(err,stdout,stderr){
        if(err){
            console.log(err);
            return;
        }
        console.log(stdout);
        exec('pm2 restart all',function(err,stdout,stderr){
            if(err){
                consol.log(err)
                return;
            }
            console.log(stdout);
        });
    })
}
 
http.createServer(function (req, res) {
    if(req.url === '/reviewpushcode'){
        console.log(req);
        res.write('ok');
        res.end();
    }
}).listen(3389,function(){
    console.log('webhook is running on 3389...');
})
 
