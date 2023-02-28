const mongoose = require('mongoose')
const { server } = require('../index')
const Product = require('../models/Product')
const { api, initialProducts, getAllNamesFromProd } = require('./helpers')

describe.skip('Products tests', () => {
  beforeAll(async () => {
    await Product.deleteMany({})

    const prod1 = new Product(initialProducts[0])
    prod1.save()

    const prod2 = new Product(initialProducts[1])
    prod2.save()
  })

  test('Products are returned as a json', async () => {
    await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There are products', async () => {
    const { response } = await getAllNamesFromProd()
    expect(response.body).toHaveLength(initialProducts.length)
  })

  test('The first product has "Jala" by name', async () => {
    const { names } = await getAllNamesFromProd()
    expect(names).toContain('Jala')
  })

  test('A valid product can be added', async () => {
    const newProd = {
      img: 'https://instagram.com',
      name: 'Roles',
      price: 16,
      unid: 'x4 roles'
    }

    await api
      .post('/api/products')
      .send(newProd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, names } = await getAllNamesFromProd()
    expect(response.body).toHaveLength(initialProducts.length + 1)
    expect(names).toContain(newProd.name)
  })

  test('A product can not be added without name', async () => {
    const newProd = {
      img: 'https://instagram.com',
      price: 16,
      unid: 'x4 roles'
    }

    await api
      .post('/api/products')
      .send(newProd)
      .expect(400)
  })

  test('A product can be deleted', async () => {
    const { response: firstResponse } = await getAllNamesFromProd()
    const { body: product } = firstResponse
    const prodToDelete = product[2]

    await api
      .delete(`/api/products/${prodToDelete.id}`)
      .expect(204)

    const { names, response: secondResponse } = await getAllNamesFromProd()
    expect(secondResponse.body).toHaveLength(initialProducts.length)
    expect(names).not.toContain(prodToDelete.name)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
