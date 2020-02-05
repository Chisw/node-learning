const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
  })
  return promise
}

const serverHandle = (req, res) => {
  // process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 404
  res.writeHead(404, {"Content-type": "text/plain"})
  res.write("404 Not Found")
  res.end()
}

module.exports = serverHandle