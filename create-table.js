const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '192.168.89.138',
    port: 3306,
    user: 'ADMIN',
    password: 'KERNEL123',
    database: 'MySql'
});

module.exports.execSQLQuery = function (sqlQry, res) {

    const connection = mysql.createConnection({
        host: '192.168.89.138',
        port: 3306,
        user: 'ADMIN',
        password: 'KERNEL123',
        database: 'MySql'
    });

    connection.query(sqlQry, (error, results, fields) => {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executed');
    })

}


connection.connect((err) => {
    if (err) console.log(err);
    console.log('Connected')
})


function execSQLQuery(sql, conn) {
    conn.query(sql, (error, results, fields) => {
        if (error) console.log(error);
        console.log(results);
    });
}

var sqlAccount =
    `CREATE TABLE IF NOT EXISTS account(
accountid INT NOT NULL auto_increment,
number    INT,
agency    INT,
name      VARCHAR(50) NOT NULL,
type      VARCHAR(20) NOT NULL,
PRIMARY KEY(accountid));`;

var sqlLanfin =
    `CREATE TABLE IF NOT EXISTS lanfin(
idlanfin  INT NOT NULL auto_increment,
value     DECIMAL,
method    VARCHAR(1) NOT NULL,
accountid VARCHAR(3) NOT NULL,
category  VARCHAR(3) NOT NULL,
PRIMARY KEY(idlanfin));`;

execSQLQuery(sqlAccount, connection);
execSQLQuery(sqlLanfin, connection);