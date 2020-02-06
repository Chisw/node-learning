const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const SESSION_DATA = {}

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (
      req.method !== 'POST' ||
      req.headers['content-type'] !== 'application/json'
    ) {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  req.cookie = {}
  ;(req.headers.cookie || '')
    .split(';')
    .forEach(str => {
      const [key, value] = (str || '').split('=')
      req.cookie[(key || '').trim()] = (value || '').trim()
    })

  // console.log('cookie ', req.cookie)

  let needSetCookie = false
  let userId = req.cookie.userId
  if (userId) {
    if (SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = Date.now() + '_' + Math.random()
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]


  getPostData(req)
    .then(data => {
      req.body = data
      // const blogData = handleBlogRouter(req, res)
      // if (blogData) {
      //   res.end(JSON.stringify(blogData))
      //   return
      // }
      const blogDataPromise = handleBlogRouter(req, res)
      if (blogDataPromise) {
        blogDataPromise
          .then(blogData => {
            if (needSetCookie) {
              res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(blogData))
          })
        return
      }

      // const userData = handleUserRouter(req, res)
      // if (userData) {
      //   res.end(JSON.stringify(userData))
      //   return
      // }
      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then(data => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(
            JSON.stringify(data)
          )
        })
       return
      }


      // 404
      res.writeHead(404, { "Content-type": "text/plain" })
      res.write("404 Not Found")
      res.end()

    })

}

module.exports = serverHandle