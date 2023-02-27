const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
  img: String,
  name: String,
  price: Number,
  unid: String,
  cant: Number,
  stock: Number
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

// Product.find({}).then(resp => {
//   console.log(resp)
//   mongoose.connection.close()
// })

// const product = new Product({
//   img: 'https://img.freepik.com/foto-gratis/disparo-vertical-deliciosos-rollos-semillas-amapola-glaseado-azucar-canasta_181624-46033.jpg?w=360&t=st=1677513742~exp=1677514342~hmac=843b18bc130333bbbc811b8f12a0f4d969d6214ec00ed517fbb76d24abc9d3fc',
//   nombre: 'Roles de canela',
//   precio: 19,
//   unid: 'x 4 Rolls',
//   cantidad: 1,
//   stock: 20
// })

// product.save()
//   .then((res) => {
//     console.log(res)
//     mongoose.connection.close()
//   })
//   .catch(error => console.error(error))
