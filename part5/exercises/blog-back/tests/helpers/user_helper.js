import User from '../../models/user.js'
import bcrypt from 'bcrypt'
import config from '../../utils/config.js'

const testUserInfo = {
  username: 'testuser',
  name: 'Testvin Userson',
  password: 'notverysecurepassword'
}

const testUsers = [
  testUserInfo,
  {
    username: 'seconduser',
    name: 'Secondton Nonen',
    password: 'onofernismad'
  }
]

const getUsers = () => {
  return User.find({})
}

const deleteAll = () => {
  return User.deleteMany({})
}

const addOneTestUser = async () => {
  const userToAdd = new User({
    username: testUserInfo.username,
    name: testUserInfo.name,
    passwordHash: await bcrypt.hash(testUserInfo.password, config.saltRounds)
  })
  return userToAdd.save()
}

const addTestUsers = async () => {
  const users = testUsers.map(async (u) => new User({
    username: u.username,
    name: u.name,
    passwordHash: await bcrypt.hash(u.password, config.saltRounds)
  }))
  return User.bulkSave(await Promise.all(users))
}

export default {
  getUsers,
  deleteAll,
  addOneTestUser,
  addTestUsers,
  testUserInfo,
  testUsers
}
