const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0714',
  port: '3306',
  database: 'myblog'
})

con.connect()

const sql = 'select * from users'

con.query(sql, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('result: ', res)
})

con.end()