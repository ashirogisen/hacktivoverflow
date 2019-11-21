const verifyToken = require('../helpers/verifyToken')
const User = require('../models/user')

function isLogin(req, res, next) {
  try {
    const token = req.headers.token
    const decodedToken = verifyToken(token)
    req.LoggedUser = decodedToken
    User.findById(req.LoggedUser.id)
      .then(user => {
        if(user) {
          next()
        } else {
          throw {
            status: 404,
            msg: 'User not found'
          }
        }
      })
  }
  catch(err) {
    next(err)
  }
}

module.exports = isLogin