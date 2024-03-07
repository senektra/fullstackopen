import _ from 'lodash'

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null

  const { title, author, url } = blogs.reduce((fav, curr) =>
    fav.likes > curr.likes ? fav : curr)

  return { title, author, url }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  const max = _(blogs).countBy(b => b.author).toPairs().maxBy(p => p[1])

  return {
    author: max[0],
    blogs: max[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null

  const likesReducer = (result, { author, likes }) =>
    ({ ...result, [author]: (result[author] += likes) || likes })

  const max = _(blogs.reduce(likesReducer, {})).toPairs().maxBy(p => p[1])

  return {
    author: max[0],
    likes: max[1]
  }
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
