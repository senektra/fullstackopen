import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import 'dotenv/config'
import 'express-async-errors'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import middleware from './utils/middleware.js'
import config from './utils/config.js'

// Connect to database
connect(config.mongodbUri)

const app = express()

// Use morgan logger for requests
app.use(middleware.morganLogger)

app.use(cors())
app.use(express.json())

// Routers
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// Error Handlers
app.use(middleware.nonApiErrorHandler)
app.use(middleware.errorHandler)

export default app
