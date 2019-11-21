const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tagSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]
})

const Tag = mongoose.model('Tags', tagSchema)

module.exports = Tag