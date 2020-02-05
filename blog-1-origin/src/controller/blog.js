const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = ${author} `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return exec(sql)
}

const getDetail = (id) => {
  return {
    id: 3,
    title: 'title3',
    content: 'content3',
    createTime: 1580879423827,
    author: 'lisi'
  }
}

const newBlog = (blogData = {}) => {
  console.log('new blog data', blogData)
  return {
    id: 5
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('update blog data', id, blogData)
  return true
}

const delBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}