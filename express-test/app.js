const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('start ', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  req.cookie = {
    userId: 'jsw'
  }
  next()
})

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('handle /api')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api')
  next()
})

app.get('/api/get-cookie', (req, res, next) => {
  console.log('get cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('handle 404')
  res.json({
    errno: -1,
    msg: '404'
  })
})

app.listen(3000, () => {
  console.log('listening 3000')
})