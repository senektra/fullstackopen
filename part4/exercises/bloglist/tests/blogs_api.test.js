import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import blogHelper from './helpers/blog_helper.js'
import app from '../app.js'

const api = supertest(app)

const doBeforeEach = async () => {
  await blogHelper.deleteBlogs()
  await blogHelper.saveBlogs()
}

const doAfter = () => {
  mongoose.connection.close()
}

describe('blogs retrieved for client are properly schemed', () => {
  test('blog posts are identified with \'id\' property', async () => {
    const res = await api.get('/api/blogs')
    const validations = res.body.map(b => Boolean(b.id))
    assert(!validations.includes(false))
  })

  beforeEach(doBeforeEach)
})

describe('GET requests at /api/blogs', () => {
  test('should get blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should get all blogs stored via dbHelper', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, blogHelper.db.length)
  })

  test('should expect the first blog to be authored by \'Michael Chan\'', async () => {
    const res = await api.get('/api/blogs')
    const authors = res.body.map(b => b.author)
    assert(authors.includes('Michael Chan'))
  })

  beforeEach(doBeforeEach)
})

describe('POST requests at /api/blogs', () => {
  test('should add blog to database', async () => {
    await api
      .post('/api/blogs')
      .send({ ...(blogHelper.dbWithOneBlog[0]) })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogHelper.allBlogs()
    assert.strictEqual(blogs.length, blogHelper.db.length + 1)
  })

  test('blog added should be correctly reflected in database', async () => {
    await api
      .post('/api/blogs')
      .send({ ...(blogHelper.dbWithOneBlog[0]) })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = (await blogHelper.allBlogs()).map(b => b.toJSON())
    const lastBlog = blogs[blogs.length - 1]
    delete lastBlog.id
    assert.deepStrictEqual(lastBlog, blogHelper.dbWithOneBlog[0])
  })

  test('likes default to 0 when not specified', async () => {
    const blogWithoutLikes = blogHelper.dbWithOneBlog[0]
    delete blogWithoutLikes.likes

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = (await blogHelper.allBlogs()).map(b => b.toJSON())
    const lastBlog = blogs[blogs.length - 1]
    assert.strictEqual(lastBlog.likes, 0)
  })

  test('response is 400 Bad Request when no title in blog', async () => {
    const blogWithoutTitle = blogHelper.dbWithOneBlog[0]
    delete blogWithoutTitle.title

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  })

  test('response is 400 Bad Request when no url in blog', async () => {
    const blogWithoutUrl = blogHelper.dbWithOneBlog[0]
    delete blogWithoutUrl.url

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })

  beforeEach(doBeforeEach)
})

describe('PUT requests at /api/blogs', () => {
  test('should update a specified blog with new data', async () => {
    const blogToUpdate = (await blogHelper.allBlogs())[0].toJSON()
    blogToUpdate.title = 'This is a new title'
    blogToUpdate.author = 'New author'
    blogToUpdate.url = 'New url'
    blogToUpdate.likes = 141

    const newBlogFromApi = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlogInDb = await blogHelper.getBlog(blogToUpdate.id)
    const blogsAfterUpdate = await blogHelper.allBlogs()

    assert.strictEqual(blogsAfterUpdate.length, blogHelper.db.length)
    assert.deepStrictEqual(newBlogFromApi.body, blogToUpdate)
    assert.deepStrictEqual(newBlogInDb.toJSON(), blogToUpdate)
  })

  beforeEach(doBeforeEach)
})

describe('DELETE requests at /api/blogs', () => {
  test('should delete a blog when given specific id', async () => {
    const blogToDelete = (await blogHelper.allBlogs())[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await blogHelper.allBlogs()
    const titles = blogsAfterDelete.map(b => b.title)

    assert.strictEqual(blogsAfterDelete.length, blogHelper.db.length - 1)
    assert(!titles.includes(blogToDelete.title))
  })

  beforeEach(doBeforeEach)
  after(doAfter)
})
