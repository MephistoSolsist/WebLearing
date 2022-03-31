const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chen881587',
    database: 'demo'
});

connection.connect();
connection.query('select * from student where name="bossche"', function (err, data, fields) {
    if (err) {
        console.log(err);
        return;
    }
    ;

    console.log(data);
});

connection.end();