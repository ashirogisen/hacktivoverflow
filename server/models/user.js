const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')
const validate = require('mongoose-validator')

let userSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Invalid email format'
      })
    ]
  },
  password: {
    type: String,
    required: true
  },
  watchedTag: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  point: {
    type: Number,
    default: 0
  }
})

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

let User = mongoose.model('User', userSchema)
module.exports = User