const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // 列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)

    return new SuccessModel(listData)
  }

  // 详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 新建
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: 'new'
    }
  }

  // 更新
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: 'update'
    }
  }

  // 删除
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: 'del'
    }
  }
}

module.exports = handleBlogRouter
