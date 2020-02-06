const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('need login')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const id = req.query.id

  // 列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    return getList(author, keyword)
      .then(listData => {
        return new SuccessModel(listData)
      })

  }

  // 详情
  if (method === 'GET' && path === '/api/blog/detail') {
    // const result = getDetail(id)
    // return new SuccessModel(result)
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建
  if (method === 'POST' && path === '/api/blog/new') {
    // const result = newBlog(req.body)
    // return new SuccessModel(result)

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新
  if (method === 'POST' && path === '/api/blog/update') {
    // const result = updateBlog(id, req.body)
    // if (result) {
    //   return new SuccessModel(result)
    // } else {
    //   return new ErrorModel(result)
    // }

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const result = updateBlog(id, req.body)
    return result.then(data => {
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('update err')
      }
    })
  }

  // 删除
  if (method === 'POST' && path === '/api/blog/del') {
    // const result = delBlog(id)
    // if (result) {
    //   return new SuccessModel(result)
    // } else {
    //   return new ErrorModel(result)
    // }

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(data => {
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('del err')
      }
    })
  }
}

module.exports = handleBlogRouter
