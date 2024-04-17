import { Router } from 'express'
import Blog from '../models/blog.js'
import auth from '../utils/auth.js'
import { userError } from '../utils/errors.js'

const blogsRouter = Router()

// Get requests

blogsRouter.get('/', async (_req, res) => {
  res.json(await Blog.find().populate('user'))
})

// Post requests

blogsRouter.post('/', auth.authenticate, async (req, res) => {
  const blog = new Blog({
    ...req.body,
    user: req.user._id
  })
  const savedBlog = await blog.save({ setDefaultsOnInsert: true })
  res.status(201).json(await savedBlog.populate('user'))
})

// Put requests

blogsRouter.put('/:id', auth.authenticate, async (req, res) => {
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

  res.json(await updatedBlog.populate('user'))
})

// Delete requests

blogsRouter.delete('/:id', auth.authenticate, async (req, res) => {
  const blogToDelete =
    (await Blog.findById(req.params.id).populate('user')).toJSON()

  if (!req.user || req.user.id !== blogToDelete.user.id)
    throw userError.userNotAllowed

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default blogsRouter
