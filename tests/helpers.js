const { app } = require('../index')
const supertest = require('supertest')

const api = supertest(app)

const initialProducts = [
  {
    img: 'https://img.freepik.com/foto-gratis/disparo-vertical-deliciosos-rollos-semillas-amapola-glaseado-azucar-canasta_181624-46033.jpg?w=360&t=st=1677513742~exp=1677514342~hmac=843b18bc130333bbbc811b8f12a0f4d969d6214ec00ed517fbb76d24abc9d3fc',
    name: 'Jala',
    price: 10,
    unid: 'x1 Barra'
  },
  {
    img: 'https://instagram.com',
    name: 'Rol de oreo',
    price: 16,
    unid: 'x4 roles'
  }
]

async function getAllNamesFromProd () {
  const response = await api.get('/api/products')
  const names = response.body.map(prod => prod.name)
  return { response, names }
}

module.exports = { initialProducts, api, getAllNamesFromProd }
