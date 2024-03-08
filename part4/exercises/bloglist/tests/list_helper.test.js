import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'
import dbHelper from './db_helper.js'

const blogs = dbHelper.db
const listWithOneBlog = dbHelper.dbWithOneBlog

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Get total likes from blogs', () => {
  test('when list has only one blog, equal the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has more than one blog, return sum of all likes among blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('when list has no blogs, return 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('Get favorite blog from list', () => {
  test('Return null if no blogs in list', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('When blog list only contains one, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    })
  })

  test('When blog list has many, return blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    })
  })
})

describe('Get author with most blogs', () => {
  test('return null if list has no blogs', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when blog list contains multiple, return author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('when blog contains only one listing, return that listing\'s author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
})

describe('Get author with most likes', () => {
  test('when blog contains multiple listings, return author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('when blog list is empty, return null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when blog list contains one blog, return that blog\'s author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})
