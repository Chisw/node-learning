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

getDetail = (id) => {
  return {
    id: 3,
    title: 'title3',
    content: 'content3',
    createTime: 1580879423827,
    author: 'lisi'
  }
}

module.exports = {
  getList,
  getDetail,
}