import morgan from 'morgan'
import logger from './logger.js'
import 'dotenv/config'

const defaultPort = 3001

const config = {
  env: process.env.NODE_ENV,
  mongodbUri: process.env.NODE_ENV === 'testing'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI,
  port: process.env.PORT,
  morganTokens: [
    { type: 'body', func: (req, _res) => JSON.stringify(req.body) }
  ],
  morganFormat: ':method :url :status :res[content-length] - :response-time ms :body',
  saltRounds: 10
}

config.morganTokens.forEach(token => {
  morgan.token(token.type, token.func)
})

if (config.port === undefined) {
  config.port = defaultPort
  logger.warn('No port set in environment, defaulting to', config.port)
}

if (config.mongodbUri === undefined) {
  logger.error('No URI set for MongoDB database, aborting')
  process.exit(1)
}

export default config
