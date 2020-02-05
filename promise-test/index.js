const fs = require('fs')
const path = require('path')

// const fullName = path.resolve(__dirname, 'file/a.json')
// fs.readFile(fullName, (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })

// use callback
// function getFileContent(fileName, callback) {
//   const fullName = path.resolve(__dirname, 'file/a.json')
//   fs.readFile(fullName, (err, data) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     callback(JSON.parse(data.toString()))
//   })
// }

// getFileContent('a.json', aData => {
//   console.log('aData: ', aData)
//   getFileContent('b.json', bData => {
//     console.log(bData)
//     getFileContent('c.json', cData => {
//       console.log(cData)
//     })
//   })
// })

function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullName = path.resolve(__dirname, 'file/a.json')
    fs.readFile(fullName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

getFileContent('a.json')
  .then(aData => {
    console.log('promise aData: ', aData)
    return getFileContent(aData.next)
  })
  .then(bData => {
    console.log('promise bData: ', bData)
    return getFileContent(bData.next)
  })
  .then(cData => {
    console.log('promise cData: ', cData)
  })