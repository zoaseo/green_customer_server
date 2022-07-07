const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql");
const fs = require("fs");

const dbinfo = fs.readFileSync('./database.json');
// 받아온 json데이터를 객체형태로 변경 JSON.parse
const conf = JSON.parse(dbinfo);

// connection mysql연결 createConnection()
// connection.connect() 연결하기
// connection.end() 연결종료
// connection.query('쿼리문', callback함수)
// callback(error, result, result의 field정보)

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
})
app.use(express.json());
app.use(cors());

app.get('/customers', async (req,res)=>{
    connection.connect();
    connection.query(
        "select * from customers_table",
        (err, rows, fields)=>{
            res.send(rows);       
            console.log(fields);
        }
    )
    connection.end();
})

// 서버실행
app.listen(port, ()=>{
    console.log("고객 서버가 돌아가고 있습니다.");
})