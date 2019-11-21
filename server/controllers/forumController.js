const Forum = require('../models/forum')
const User = require('../models/user')

class forumController {
  static create (req, res, next) {
    const createdForum = {
      name: req.body.name,
      description: req.body.description,
      master: req.LoggedUser.id,
      post: []
    }

    Forum.create(createdForum)
      .then(forum => {
        res.status(201).json(createdForum)
      })
      .catch(next)
  }

  static getAll (req, res, next) {
    Forum.find().populate('master')
      .then(forums => {
        res.status(200).json(forums)
      })
      .catch(next)
  }

  static getOne (req, res, next) {
    Forum.findById(req.params.id).populate('master')
      .then(forum => {
        res.status(200).json(forum)
      })
      .catch(next)
  }

  static addPost (req, res, next) {
    Forum.findByIdAndUpdate(req.params.id, {
      $push: {
        post: {
          post: req.body.post,
          user: req.LoggedUser.name
        }
      }
    })
      .then(forum => {
        res.status(200).json({
          msg: 'Successfully add a post'
        })
      })
      .catch(next)
  }

  static delete (req, res, next) {
    Forum.findByIdAndDelete(req.params.id)
      .then(forum => {
        res.status(200).json({
          msg: 'Forum is successfully deleted'
        })
      })
      .catch(next)
  }
}

module.exports = forumController