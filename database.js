require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
    host:process.env.DATAHOST,
    port:process.env.DATAPORT,
    username:process.env.DATAUSER,
    password:process.env.DATAPASS,
    database:process.env.DATABASE
});
db.connect((err)=>{
    if(err) throw err;
    console.log("connected...");
});

module.exports = db;