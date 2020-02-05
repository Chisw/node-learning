const { add, mul } = require('./a')
const _ = require('lodash')

const sum = add(10, 20) + mul(1, 1)
console.log(_.isArray(sum))