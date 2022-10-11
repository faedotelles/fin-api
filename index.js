const mysql = require('mysql2');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;
const {convertLanfin} = require('./lanfin')
const {convertAccount} = require('./lanfin')
const {execSQLQuery} = require('./create-table')

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => res.json({ message: 'API PATH' })) ;

app.listen(port);

// CRUD LANFIN
app.get('/lanfin/:idlanfin?', (req, res) => {
    let filter = '';
    if (req.params.idlanfin) filter = ' WHERE IDLANFIN = ' + parseInt(req.params.idlanfin);
    execSQLQuery('SELECT * FROM LANFIN' + filter, res);
});

app.delete('/lanfin/:idlanfin', (req, res) => {
    execSQLQuery('DELETE FROM LANFIN WHERE IDLANFIN = ' + parseInt(req.params.idlanfin), res);
});


app.post('/lanfin', (req, res) => {
    const rel = convertLanfin(req);
    execSQLQuery(`insert into LANFIN (value, method, accountid, category) values ('${rel.lanfin.value}','${rel.lanfin.method}','${rel.lanfin.accountid}','${rel.lanfin.category}')`, res);
} )

app.patch('/lanfin/:idlanfin' , (req, res) => {
    const rel = convertLanfin(req);
    const idlanfin = req.params.idlanfin
    execSQLQuery(`update lanfin set value = ${rel.lanfin.value}, method = ${rel.lanfin.method}, accountid = ${rel.lanfin.accountid}, category = ${rel.lanfin.category} where idlanfin = ${idlanfin};`)
})

// CRUD ACCOUNT
app.get('/account/:accountid?', (req, res) =>{
    let filter = '';
    if(req.params.accountid) filter = ' WHERE ACCOUNTID = ' + parseInt(req.params.accountid);
    execSQLQuery('SELECT * FROM ACCOUNT' + filter, res);
});

app.delete('/account/:accountid', (req, res) => {
    execSQLQuery('delete from account where accountid = ' + parseInt(req.params.accountid), res);
})

app.post('/account', (req, res) =>{
    const rel = convertAccount(req);
    execSQLQuery(`insert into ACCOUNT (number,agency,name,type) values ('${rel.account.number}','${rel.account.agency}', '${rel.account.name}', '${rel.account.type}');`, res)
})

app.patch("/account/:accounid", (req,res) => {
    const rel = convertAccount(req);
    const accountid = parseInt(req.params.accounid);
    execSQLQuery(`UPDATE Account SET NUMBER = ${rel.account.number}, agency = ${rel.account.agency}, name =  ${rel.account.name}, type = ${rel.account.type} WHERE id = ${accountid};`)
})
