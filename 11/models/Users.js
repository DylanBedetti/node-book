// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
// Creating a Model through a Schema interface
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function(next) {
  const user = this

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})


const User = mongoose.model('User', UserSchema)

module.exports = User