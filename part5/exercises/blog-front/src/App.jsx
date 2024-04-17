import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifMsg, setNotifMsg] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    blogFormRef.current.toggleVisibility()
    setNotifMsg({
      type: 'Info',
      content: `New blog '${blog.title}' created successfully`
    })
  }

  const handleBlogUpdate = (id, blog) => {
    if (!blog)
      setBlogs(blogs.filter(b => id !== b.id))
    else
      setBlogs(blogs.map(b => id === b.id ? blog : b))
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

          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogForm onNewBlog={handleNewBlog} />
          </Togglable>

          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} onUpdate={(newBlog) => handleBlogUpdate(blog.id, newBlog)} />
          )}
        </div>
      }
    </div>
  )
}

export default App
