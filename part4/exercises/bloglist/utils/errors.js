const createUserError = (status, message) =>
  createError(status, 'UserError', message)

export const createError = (status, name, message) => {
  return {
    status,
    name,
    message
  }
}

export const userError = {
  noUsername: createUserError(
    400, 'No username provided'
  ),
  usernameTooShort: createUserError(
    400, 'Username is too short'
  ),
  noPassword: createUserError(
    400, 'No password provided'
  ),
  passwordTooShort: createUserError(
    400, 'Password is too short'
  )
}
