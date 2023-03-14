const productsRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')
const Product = require('../models/Product')
const User = require('../models/User')

require('dotenv').config({ path: '../.env' })

productsRouter.get('/', (request, response) => {
  Product.find({})
    .then((prod) => response.json(prod))
})

productsRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Product.findById(id)
    .then(prod => {
      if (prod) {
        response.status(200).json(prod)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

productsRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const product = request.body

  const newProdInfo = {
    img: product.img,
    name: product.name,
    price: product.price,
    unid: product.unid,
    cant: product.cant,
    stock: product.stock
  }

  Product.findByIdAndUpdate(id, newProdInfo, { new: true })
    .then(res => response.json(res))
    .catch(next)
})

productsRouter.post('/', userExtractor, async (request, response) => {
  const { name, img, price, unid, cant, stock, category } = request.body
  const { userId } = request
  const user = await User.findById(userId)

  if (!name) {
    return response.status(400).json({
      error: 'product name is empty'
    })
  }

  const newProduct = new Product({
    img,
    name,
    price,
    unid,
    category,
    cant: cant || 1,
    stock: stock || 20,
    user: user._id
  })
  try {
    const savedProd = await newProduct.save()
    user.products = user.products.concat(savedProd._id)

    await user.save()

    response.json(savedProd)
  } catch {
    response.status(400).end()
  }
})

productsRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Product.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

module.exports = productsRouter
