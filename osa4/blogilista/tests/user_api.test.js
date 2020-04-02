const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const users = [ { _id: '5e83d23beb708a0d18d95318', username: 'Matti', name: 'Matti Mattinen', password: 'secret' },
  { _id: '7e83d22beb708a5d18d95318', username: 'Mara', name: 'Mara Maranen', password: 'secret' }

]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(users)
})

test('password has a minimum length of 3', async () => {
  const newUser = {
    username: 'Jarmo123',
    name: 'Jarmo',
    password: 'a',
  }
  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  expect(res.body.error).toBe('password should be atleast 3 characters long')
})

test('username has a minimum length of 3', async () => {
  const newUser = {
    username: 'Ja',
    name: 'Jarmo',
    password: 'secret',
  }
  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  expect(res.body.error).toBe('User validation failed: username: Path `username` (`Ja`) is shorter than the minimum allowed length (3).')
})

afterAll(() => {
  mongoose.connection.close()
})