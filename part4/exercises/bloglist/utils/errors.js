const createError = (status, name, message) => {
  return {
    status,
    name,
    message
  }
}

export default createError
