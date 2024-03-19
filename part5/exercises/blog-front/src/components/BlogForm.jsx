import { useState } from "react"

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
      const newBlog = await blogService.createBlog({ title, author, url })
      onNewBlog(newBlog)
    } catch (err) {
      setNotifMsg({
        type: 'Error',
        content: err.response.data.message
      })
    }
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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
