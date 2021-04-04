let http = require('http');
let webhook = http.createServer(function (req, res) {
    console.log(req.method,req.url)
    if(req.method=='post'&&req.url=='/webhook'){
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({ok:true}))
    }else {
        res.end('Not Found')
    }
})
webhook.listen(4000,()=>{
    console.log('webhook服务已经在4000端口上启动')
})
