const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', (request, response, next) => {
  User.find({}).populate('products', {
    name: 1,
    price: 1,
    unid: 1,
    stock: 1
  })
    .then((prod) => response.json(prod))
    .catch((error) => next(error))
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, password } = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error })
  }
})

usersRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  User.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

module.exports = usersRouter
