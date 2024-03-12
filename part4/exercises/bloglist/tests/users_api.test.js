import { describe, test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import userHelper from './helpers/user_helper.js'
import { userError } from '../utils/errors.js'

const api = supertest(app)

const doBeforeEach = (startWithTestUsers) => {
  return async () => {
    await userHelper.deleteAll()
    if (startWithTestUsers) await userHelper.addTestUsers()
  }
}

const doAfter = () => {
  mongoose.connection.close()
}

describe('GET requests at /api/user', () => {
  beforeEach(doBeforeEach(true))

  test('should return all users in db', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAdded = res.body

    assert.strictEqual(usersAdded.length, userHelper.testUsers.length)
  })

  test(`should return users containing ${userHelper.testUserInfo.username}`, async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAdded = res.body
    const usernames = usersAdded.map(u => u.username)

    assert(usernames.includes(userHelper.testUserInfo.username))
  })
})

describe('POST requests at /api/users', () => {
  beforeEach(doBeforeEach(false))

  test('should add a user when sent username, password and name', async () => {
    const usersBeforeAdd = (await userHelper.getUsers()).length

    const res = await api
      .post('/api/users')
      .send(userHelper.testUserInfo)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newAddedUser = res.body
    const usersAfterAdd = (await userHelper.getUsers()).length
    delete newAddedUser.id

    assert.strictEqual(usersBeforeAdd, usersAfterAdd - 1)
    assert.deepStrictEqual(newAddedUser, {
      username: 'testuser',
      name: 'Testvin Userson',
    })
  })

  test('should not add a user when username is not given', async () => {
    const userToAdd = { ...userHelper.testUserInfo }
    delete userToAdd.username

    const res = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    const usersInDb = await userHelper.getUsers()
    const err = res.body
    assert.strictEqual(usersInDb.length, 0)
    assert.deepStrictEqual(err, userError.noUsername)
  })

  test('should not add a user when password is not given', async () => {
    const userToAdd = { ...userHelper.testUserInfo }
    delete userToAdd.password

    const res = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    const usersInDb = await userHelper.getUsers()
    const err = res.body
    assert.strictEqual(usersInDb.length, 0)
    assert.deepStrictEqual(err, userError.noPassword)
  })

  test('should not add a user when username is too short', async () => {
    const userToAdd = { ...userHelper.testUserInfo }
    userToAdd.username = 'ts'

    const res = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    const usersInDb = await userHelper.getUsers()
    const err = res.body
    assert.strictEqual(usersInDb.length, 0)
    assert.deepStrictEqual(err, userError.usernameTooShort)
  })

  test('should not add a user when password is too short', async () => {
    const userToAdd = { ...userHelper.testUserInfo }
    userToAdd.password = 'pw'

    const res = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    const usersInDb = await userHelper.getUsers()
    const err = res.body
    assert.strictEqual(usersInDb.length, 0)
    assert.deepStrictEqual(err, userError.passwordTooShort)
  })

  after(doAfter)
})
