const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
const User = require('../models/User')
const { api, getAllUsers } = require('./helpers')

describe.only('Users testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Voluspak', passwordHash })

    await user.save()
  })

  test('Should work as expected creating a fresh user', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'Ivancho',
      password: 'hamaca11'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code condition and message if username is already taken', async () => {
    const allUsers = await getAllUsers()

    const newUser = {
      username: 'Voluspak',
      password: 'ronaldinho'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error.errors.username.message).toContain('`username` to be unique')

    const userAtEnd = await getAllUsers()
    expect(userAtEnd).toHaveLength(allUsers.length)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
