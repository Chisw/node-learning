const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // res.writeHead(200, {'content-type': 'text/html'})
  // res.end('<h2>Hello</h2>')


  // console.log(req.method)
  // const url = req.url
  // console.log(url)
  // req.query = querystring.parse(url.split('?')[1])
  // res.end(JSON.stringify(req.query))


  // if (req.method === 'POST') {
  //   console.log('req content-type: ', req.headers['content-type'])
  //   let postdata = ''
  //   req.on('data', chunk => {
  //     postdata += chunk.toString()
  //   })
  //   req.on('end', () => {
  //     console.log('postdata: ', postdata)
  //     console.log('end')
  //   })
  // }

  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  res.setHeader('Content-type', 'application/json')

  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))

    })
  }
})

server.listen(8000, () => {
  console.log('listening on 8000')
})