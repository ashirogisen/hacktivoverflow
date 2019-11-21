const User = require('../models/user')
const generateToken = require('../helpers/generateToken')
const verifyPassword = require('../helpers/verifyPassword')

class userController {
  static register (req, res, next) {
    const createdData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(createdData)
      .then(created_data => {
        const data = {
          id: created_data._id,
          name: created_data.name,
          email: created_data.email
        }
        const token = generateToken(data)
        res.status(201).json({token, data})
      })
      .catch(next)
  }

  static login (req, res, next) {
    const email = {
      email: req.body.email
    }
    User.findOne(email)
      .then(user_data => {
        const paswordIsTrue = verifyPassword(req.body.password, user_data.password)
        if (paswordIsTrue) {
          const data = {
            id: user_data._id,
            name: user_data.name,
            email: user_data.email,
            watchedTag: user_data.watchedTag,
            point: user_data.point
          }
          const token = generateToken(data)
          res.status(200).json({token, data})
        } else {
          throw {
            message: 'Wrong email or password',
            statusCode: 401
          }
        }
      })
      .catch(next)
  }

  static getUserData (req, res, next) {
    User.findById(req.LoggedUser.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  } 

  static addToWatchTag (req, res, next) {
    User.findByIdAndUpdate(req.LoggedUser.id, {
      $push: {
        watchedTag: req.params.id
      }
    })
      .then(user => {
        res.status(200).json({
          msg: 'Successfully added to your Watched Tags list'
        })
      })
      .catch(next)
  }

  static getAllUser (req, res, next) {
    User.find().sort([["point", 1]])
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }

  static removeFromWatchTag (req, res, next) {
    User.findByIdAndUpdate(req.LoggedUser.id, {
      $pull: {
        watchedTag: req.params.id
      }
    })
      .then(user => {
        res.status(200).json({
          msg: 'Successfully removed from your Watched Tags list'
        })
      })
      .catch(next)
  }
}

module.exports = userController