let http = require('http');
let crypto = require('crypto')
let SECRET = '123456';
function sign(body){
    return `sha1=`+crypto.creatHmac('sha1',SECRET).update(body).digest('hex')
}
let webhook = http.createServer(function (req, res) {
    console.log(req.method,req.url)
    if(req.method=='post'&&req.url=='/webhook'){

        let buffers = [];
        req.on('data',function (buffer) {
           buffers.push(buffer)
        })
        req.on('end',function (Buffer) {
           let body =  Buffer.concat(buffers)
            let event = req.headers['x-gitHub-event'];
           //github请求过来时候，要传递请求体body,另外还会传一个signature过来，需要验证签名对不对
            let signature = req.headers['x-hub-signature']
            if(signature !==sign(body)){
                return res.end('Not Allowed');
            }
        })
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({ok:true}))
    }else {
        res.end('Not Found')
    }
})
webhook.listen(4000,()=>{
    console.log('webhook服务已经在4000端口上启动')
})
