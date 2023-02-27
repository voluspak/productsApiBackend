require('./mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const Product = require('./models/Product')
const logger = require('./loggerMiddleware')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
// const HEROKU_URL = 'https://damp-tor-79770.herokuapp.com/'

app.use(cors())
app.use(express.json())

app.use(logger)

Sentry.init({
  dsn: 'https://ad3664737e7148afbcb0749f2d47a4f5@o4504753410867200.ingest.sentry.io/4504753416568832',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.get('/', (request, response) => {
  response.status(200).send('<h1>Galipan Database</h1>')
})

app.get('/api/products', (request, response) => {
  Product.find({})
    .then((prod) => response.json(prod))
})

app.get('/api/products/:id', (request, response, next) => {
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

app.put('/api/products/:id', (request, response, next) => {
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
})

app.post('/api/products', (request, response) => {
  const product = request.body

  if (!product) {
    return response.status(400).json({
      error: 'product is empty'
    })
  } else if (!product.name) {
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

app.delete('/api/products/:id', (request, response, next) => {
  const { id } = request.params
  Product.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

app.use(Sentry.Handlers.errorHandler())

app.use(notFound)

app.use(handleErrors)
const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
