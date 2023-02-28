const mongoose = require('mongoose')
const { Schema, model } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: { type: String, unique: true },
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

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
