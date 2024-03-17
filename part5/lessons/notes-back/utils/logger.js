const loggingAllowed = () => {
  if (process.env.NODE_ENV === 'testing')
    return false
  else
    return true
}

const info = (...params) => {
  if (loggingAllowed()) console.log(...params)
}

const error = (...params) => {
  if (loggingAllowed()) console.error(...params)
}

module.exports = {
  info, error
}
