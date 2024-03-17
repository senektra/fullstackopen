import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import config from '../utils/config.js'
import { userError } from '../utils/errors.js'
import 'dotenv/config'

const usersRouter = Router()

const validateUser = (username, password) => {
  if (!username)
    throw userError.noUsername
  if (!password)
    throw userError.noPassword
  if (username.length < 3)
    throw userError.usernameTooShort
  if (password.length < 3)
    throw userError.passwordTooShort
}

// Get Requests

usersRouter.get('/', async (_req, res) => {
  res.json(await User.find({}))
})

// POST requests

usersRouter.post('/', async (req, res) => {
  const {
    username,
    name,
    password
  } = req.body

  validateUser(username, password)

  const passwordHash = await bcrypt.hash(password, config.saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  validateUser(username, password)

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    throw userError.badLogin
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id
  }, process.env.TOKEN_SECRET)

  res.status(200).json({ token, username: user.username, name: user.name })
})

export default usersRouter


