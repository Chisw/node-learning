const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// read file
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })


// write
// const content = 'new content\n'
// const opt = {
//   flag: 'a',  // 追加
// }

// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.log(err)
//   }
// })


// exist
fs.exists(fileName, (exist) => {
  console.log('exist: ', exist)
})