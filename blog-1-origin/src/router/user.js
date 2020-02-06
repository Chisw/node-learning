const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // 登录
  if (method === 'GET' && path === '/api/user/login') {
    const { username, password} = req.query
    const result = login(username, password)
    // if (result) {
    //   return new SuccessModel(result)
    // } else {
    //   return new ErrorModel('登录失败')
    // }
    return result.then(user => {
      if (user) {
        // res.setHeader('Set-Cookie', `username=${user.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        req.session.username = user.username
        req.session.realname = user.realname

        return new SuccessModel(user)
      } else {
        return new ErrorModel('no user')
      }
    })
  }

  // 登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel(true))
    }
    return Promise.resolve(new ErrorModel('login err'))
  }

}

module.exports = handleUserRouter