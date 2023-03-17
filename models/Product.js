const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
  img: String,
  name: String,
  price: Number,
  unid: String,
  category: String,
  cant: Number,
  display: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

productSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model('Product', productSchema)

module.exports = Product
