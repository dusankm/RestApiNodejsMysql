const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'company'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log('Error en conexion',err);
        return;
    }
    else{
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;