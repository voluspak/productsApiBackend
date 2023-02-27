const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let products = [
  {
    id: 1,
    name: 'rol',
    category: 'roller'
  },
  {
    id: 2,
    name: 'canilla',
    category: 'bread'
  }
]

app.get('/', (request, response) => {
  response.status(200).send('<h1>Galipan Database</h1>')
})

app.get('/api/products', (request, response) => {
  response.status(200).json(products)
})

app.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const prodId = products.find(prod => prod.id === id)
  if (prodId) {
    response.status(200).json(prodId)
  } else {
    response.status(404).end()
  }
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

  const ids = products.map(prod => prod.id)
  const maxId = Math.max(...ids)
  const newProduct = {
    id: maxId + 1,
    name: product.name,
    category: product.category
  }
  products = [...products, newProduct]
  response.status(200).json(newProduct)
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const prodId = products.find(prod => prod.id === id)
  if (prodId) {
    products = products.filter(prod => prod.id !== id)
    response.status(204).json(products)
  } else {
    response.status(404).json({
      error: 'Id not found or already deleted'
    })
  }
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Path not found'
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
