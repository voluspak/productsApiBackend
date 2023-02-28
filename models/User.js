const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  user: String,
  passwordHash: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
