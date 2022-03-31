const ws = require('nodejs-websocket')
const port = 3010
let user = 0;

const server = ws.createServer(function (conn) {
    console.log('收到了新的连接')
    user++
    conn.userName = `用户${user}`
    broadcast(`${conn.userName}进入聊天室`)
    conn.on('text', data => {
        console.log(data)
        broadcast(`${conn.userName}:${data}`)
    })
    conn.on('close', data => {
        console.log(`${conn.userName}退出连接`)
    })
});

//向所有客户端发送消息
function broadcast(msg){
    server.connections.forEach(item=>{
        item.send(msg)
    })
}

//监听端口
server.listen(port, () => {
    console.log('服务启动成功')
})