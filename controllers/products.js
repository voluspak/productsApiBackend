const productsRouter = require('express').Router()
const Product = require('../models/Product')

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

productsRouter.put('/:id', (request, response, next) => {
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

productsRouter.post('/', (request, response) => {
  const product = request.body

  if (!product) {
    return response.status(400).json({
      error: 'product is empty'
    })
  } else if (!product.name || product.name === '') {
    return response.status(400).json({
      error: 'product.name is missing'
    })
  }

  const newProduct = new Product({
    img: product.img,
    name: product.name,
    price: product.price,
    unid: product.unid,
    cant: product.cant || 1,
    stock: product.stock || 20
  })
  newProduct.save()
    .then(savedProd => response.status(201).json(savedProd))
    .catch(() => response.status(400).end())
})

productsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Product.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

module.exports = productsRouter
