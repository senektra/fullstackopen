import { Router } from 'express'
import Blog from '../models/blog.js'

const blogsRouter = Router()

// Get requests

blogsRouter.get('/', async (_req, res) => {
  res.json(await Blog.find({}))
})

// Post requests

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  res.status(201).json(await blog.save({ setDefaultsOnInsert: true }))
})

// Put requests

blogsRouter.put('/:id', async (req, res) => {
  const {
    title,
    url,
    author,
    likes
  } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, url, author, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedBlog)
})

// Delete requests

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default blogsRouter
