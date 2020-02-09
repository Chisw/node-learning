var express = require('express')
var router = express.Router()

router.post('/login', function(req, res, next) {
  res.json({
    errno: 0,
    data: {
      username: 'jsw',
      password: '123'
    }
  })
})

module.exports = router
