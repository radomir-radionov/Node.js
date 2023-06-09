const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  login: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Login is required',
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid login '
    ]
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  image: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('Users', userSchema)
