const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
require('dotenv').config({ path: '../.env' })

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }
  const secretPass = process.env.ADMIN_SECRET_PASS
  const token = jwt.sign(userForToken, secretPass, { expiresIn: 60 * 60 * 24 * 30 })

  response.send({ username: user.username, token })
})

module.exports = loginRouter
