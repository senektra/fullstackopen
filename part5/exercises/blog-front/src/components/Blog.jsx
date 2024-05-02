import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showContent, setShowContent] = useState(false)

  const buttonViewLabel = showContent ? 'hide' : 'view'

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.updateBlog(newBlog)
    onUpdate(updatedBlog)
  }

  const canDelete = () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (!user) return false
    else
      return user.username === blog.user.username
  }

  const deleteBlog = () => {
    const ok = window.confirm(`Okay to delete blog '${blog.title}'?`)
    if (ok) blogService.deleteBlog(blog)
    onUpdate(null)
  }

  const toggleView = () => setShowContent(!showContent)

  const content = () => (
    <div className='blog-content'>
      {blog.url}<br />
      {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br />
      {blog.user.username}<br />
      {canDelete() ?
        <button onClick={deleteBlog}>delete</button> : null
      }
    </div>
  )

  return (
    <div>
      <div style={blogStyle} className='blog-listing'>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{buttonViewLabel}</button>
        {showContent ? content() : null}
      </div>
    </div>
  )
}

export default Blog
