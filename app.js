const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 3001
const jsonParser = bodyParser.json();

//数据库连接
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chen881587',
    database: 'demo'
});
connection.connect();

//数据库处理
function login(username, password, res) {
    connection.query(`select *
                      from user
                      where uid = '${username}'`, function (err, data, fields) {
        if (err) {
            console.log(err);
            res.send('出现错误')
            return;
        }
        if (data == '') {
            res.send('账号不存在');
        } else if (data[0].password != password) {
            res.send('密码错误');
        } else if (data[0].password == password) {
            res.send([data[0].id, data[0].name]);
        }
    })
}
function signup(name, username, password, res) {
    connection.query(`select *
                      from user
                      where uid = '${username}'`, function (err, data, fields) {
        if (err) {
            console.log(err)
            res.send('出现错误')
            return;
        }
        if (data != '') {
            res.send('账号已存在');
        } else {
            connection.query(`insert into user (uid, name, password)
                              values ('${username}', '${name}', '${password}')`, function (err, data, fields) {
                if (err) {
                    console.log(err)
                    res.send('出现错误')
                    return;
                }
                res.send("账号创建成功")
            })
        }
    })
}
function user(id,res){
    connection.query(`select *
                      from user
                      where id = ${id}`, function (err, data, fields) {
        if (err) {
            console.log(err)
            res.send('出现错误')
            return;
        }
        res.send([data[0].name,data[0].icon])
    })
}

//跨域通讯
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//接收请求
app.post('/login', jsonParser, (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (username == '' || password == '') {
        res.send('账号或密码为空')
    } else {
        login(username, password, res)
    }
})
app.post('/signup', jsonParser, (req, res) => {
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    if (username == '' || password == '' || name == '') {
        res.send('请不要留空')
    } else {
        signup(name, username, password, res)
    }
})
app.post('/user', jsonParser, (req, res) => {
    var id = req.body.id;
    user(id,res)
})

//监听端口
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
