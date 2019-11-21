const mongoose = require('mongoose')
const Schema = mongoose.Schema

let forumSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  post: [],
  master: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Forum = mongoose.model('Forum', forumSchema)

module.exports = Forum