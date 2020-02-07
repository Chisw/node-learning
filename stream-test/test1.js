// process.stdin.pipe(process.stdout)

const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'PUT') {
    req.pipe(res)
  }
})

server.listen(8003)