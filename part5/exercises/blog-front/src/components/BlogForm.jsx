import { useState } from 'react'

import Notification from './Notification'

import blogService from '../services/blogs'

const BlogForm = ({ onNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }
      await blogService.createBlog(newBlog)
      onNewBlog(newBlog)
      cleanForm()
    } catch (err) {
      setNotifMsg({
        type: 'Error',
        content: err.response.data.message
      })
    }
  }

  const cleanForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Notification message={notifMsg} />
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            name="title"
            value={title}
            placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={author}
            placeholder='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={url}
            placeholder='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
