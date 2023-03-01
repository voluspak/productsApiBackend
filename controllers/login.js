const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!correctPassword) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  response.send({ username: user.username })
})

module.exports = loginRouter
