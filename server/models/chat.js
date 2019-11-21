const mongoose = require('mongoose')
const Schema = mongoose.Schema

let chatSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  }
})

let Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat