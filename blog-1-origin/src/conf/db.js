const env = process.env.NODE_ENV

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '0714',
  port: '3306',
  database: 'myblog'
}

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0714',
    port: '3306',
    database: 'myblog'
  }
} else if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0714',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = MYSQL_CONF