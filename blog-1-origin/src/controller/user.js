const login = (username, password) => {
  if (username === 'jsw' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  login,
}