import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifMsg, setNotifMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) loginUser(JSON.parse(user))
  }, [])

  const loginUser = (user) => {
    setUser(user)
    blogService.setToken(user.token)
  }

  const logoutUser = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const handleNewBlog = (blog) => {
    setBlogs(blogs.concat(blog))
    setNotifMsg({
      type: 'Info',
      content: `New blog '${blog.title}' created successfully`
    })
  }

  return (
    <div>
      <Notification message={notifMsg} />
      <h2>blogs</h2>
      {!user ?
        <LoginForm onUserLoggedIn={loginUser} />
      :
        <div>
          <div>
            {user.username} is logged in
            <button onClick={logoutUser}>Logout</button>
          </div>
          <BlogForm onNewBlog={handleNewBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
