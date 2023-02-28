const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', (request, response) => {
  User.find({})
    .then((prod) => response.json(prod))
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = new User({
    username,
    passwordHash: password
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  User.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

module.exports = usersRouter
