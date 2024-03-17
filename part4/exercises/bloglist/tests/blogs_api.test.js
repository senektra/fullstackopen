import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import blogHelper from './helpers/blog_helper.js'
import userHelper from './helpers/user_helper.js'
import app from '../app.js'
import { userError } from '../utils/errors.js'

const api = supertest.agent(app)

const doBeforeEach = (addTestUser) => {
  return async () => {
    await blogHelper.deleteBlogs()
    api.auth(null)
    if (addTestUser) {
      await userHelper.deleteAll()
      // Create User
      const user = await userHelper.addOneTestUser()

      // Authenticate and get access token for tests that need it
      const res = await api
        .post('/api/users/login')
        .send({
          username: userHelper.testUserInfo.username,
          password: userHelper.testUserInfo.password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert(res.body.token)
      api.auth(res.body.token, { type: 'bearer' })
      await blogHelper.saveBlogs(user._id)
    } else {
      await blogHelper.saveBlogs()
    }
  }
}

const doAfter = () => {
  mongoose.connection.close()
}

describe('blogs retrieved for client', () => {
  test('are identified with \'id\' property', async () => {
    const res = await api.get('/api/blogs')
    const validations = res.body.map(b => Boolean(b.id))
    assert(!validations.includes(false))
  })

  beforeEach(doBeforeEach(false))
})

describe('GET requests at /api/blogs', () => {
  beforeEach(doBeforeEach(false))

  test('should retrieve blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should get all blogs that were created', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, blogHelper.db.length)
  })

  test('should expect the first blog to be authored by \'Michael Chan\'', async () => {
    const res = await api.get('/api/blogs')
    const authors = res.body.map(b => b.author)
    assert(authors.includes('Michael Chan'))
  })
})

describe('POST requests at /api/blogs when not authenticated', () => {
  beforeEach(doBeforeEach(false))

  test('should not add blogs', async () => {
    await api
      .post('/api/blogs')
      .send({ ...(blogHelper.dbWithOneBlog[0]) })
      .expect(401)

    const blogs = await blogHelper.allBlogs()
    assert.strictEqual(blogs.length, blogHelper.db.length)
  })
})

describe('POST requests at /api/blogs when authenticated', () => {
  // Start tests with blogs and authenticated user
  beforeEach(doBeforeEach(true))

  test('should add a blog to the database', async () => {
    await api
      .post('/api/blogs')
      .send({ ...(blogHelper.dbWithOneBlog[0]) })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogHelper.allBlogs()
    assert.strictEqual(blogs.length, blogHelper.db.length + 1)
  })

  test('should not add a blog to the database', async () => {
    await api
      .post('/api/blogs')
      .send({ ...(blogHelper.dbWithOneBlog[0]) })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogHelper.allBlogs()
    assert.strictEqual(blogs.length, blogHelper.db.length + 1)
  })

  test('should correctly reflect created blog in database', async () => {
    const blogToAdd = { ...(blogHelper.dbWithOneBlog[0]) }
    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Get created blog
    const blogs = (await blogHelper.allBlogs()).map(b => b.toJSON())
    const lastBlog = blogs[blogs.length - 1]
    delete lastBlog.id

    // Prep expected blog with user
    const user = (await userHelper.getUsers())[0].toJSON()
    blogToAdd.user = user

    assert.deepStrictEqual(lastBlog, blogToAdd)
  })

  test('should default likes to 0 when not specified', async () => {
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

  describe('should respond 400 bad request', () => {
    test('when no title in blog', async () => {
      const blogWithoutTitle = blogHelper.dbWithOneBlog[0]
      delete blogWithoutTitle.title

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
    })

    test('when no url in blog', async () => {
      const blogWithoutUrl = blogHelper.dbWithOneBlog[0]
      delete blogWithoutUrl.url

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
    })
  })
})

describe('PUT requests at /api/blogs when not authenticated', () => {
  beforeEach(doBeforeEach(false))

  test('should not update a specified blog with new data', async () => {
    const blogToUpdate = (await blogHelper.allBlogs())[0].toJSON()
    const newBlogToSend = { ...blogToUpdate }
    newBlogToSend.title = 'This is a new title'
    newBlogToSend.author = 'New author'
    newBlogToSend.url = 'New url'
    newBlogToSend.likes = 141

    const newBlogFromApi = await api
      .put(`/api/blogs/${newBlogToSend.id}`)
      .send(newBlogToSend)
      .expect(401)

    const newBlogInDb = await blogHelper.getBlog(newBlogToSend.id)
    const blogsAfterUpdate = await blogHelper.allBlogs()

    assert.strictEqual(blogsAfterUpdate.length, blogHelper.db.length)
    assert.strictEqual(newBlogFromApi.body.message, userError.userNotAuthorized.message)
    assert.deepStrictEqual(newBlogInDb.toJSON(), blogToUpdate)
  })
})

describe('PUT requests at /api/blogs when authenticated', () => {
  beforeEach(doBeforeEach(true))

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
})

describe('DELETE requests at /api/blogs', () => {
  beforeEach(doBeforeEach(true))

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
})

after(doAfter)
