const Chat = require('../models/chat')
const User = require('../controllers/userController')

class chatController {
  static getAll (req, res, next) {
    Chat.find().populate('user')
      .then(chats => {
        res.status(200).json(chats)
      })
      .catch(next)
  }

  static create (req, res, next) {
    const createdChat = {
      user: req.LoggedUser.id,
      message: req.body.message
    }

    Chat.create(createdChat)
      .then(chat => {
        return Chat.findById(chat._id).populate('user')
      })
      .then(chat => {
        res.status(201).json({
          chat, msg: 'Message is added'
        })
      })
      .catch(next)
  }
}

module.exports = chatController