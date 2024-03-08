import { Router } from 'express'
import Blog from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/api/blogs', async (_req, res) => {
  res.json(await Blog.find({}))
})

blogsRouter.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  res.status(201).json(await blog.save({ setDefaultsOnInsert: true }))
})

export default blogsRouter
