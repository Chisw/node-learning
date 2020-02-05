const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title1',
      content: 'content1',
      createTime: 1580879442827,
      author: 'zhangsan'
    },
    {
      id: 3,
      title: 'title3',
      content: 'content3',
      createTime: 1580879423827,
      author: 'lisi'
    }
  ]
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