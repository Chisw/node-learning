const redis = require('redis')

// create client
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.log('redis error: ', err)
})

// test
redisClient.set('name', 'jsw', redis.print)
redisClient.get('name', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('val', val)
  redisClient.quit()
})