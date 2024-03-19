import { useState } from "react"

import Notification from './Notification'

import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      resetForm()
    } catch (err) {
      setNotifMessage({
        type: 'Error',
        content: err.response.data.message
      })
    }
  }

  return (
    <div>
      <Notification message={notifMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LoginForm
