//import morgan from 'morgan'
import morgan from 'morgan'
import createError from './errors.js'
import config from './config.js'

const morganLogger = morgan(config.morganFormat)

const nonApiErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    next(createError(400, err.name, 'Invalid format for id'))
  }
  else if (err.name === 'ValidationError') {
    next(createError(400, err.name, Object.values(err.errors)[0].message))
  } else {
    next(err)
  }
}

const errorHandler = (err, _req, res, _next) => {
  res.status(err.status || 500).json(err)
}

export default { nonApiErrorHandler, errorHandler, morganLogger }
