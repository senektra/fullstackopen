import Blog from '../../models/blog.js'

const dbWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }
]

const db = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

export default {
  deleteBlogs: () => {
    return Blog.deleteMany({})
  },
  saveBlogs: (userForBlogs) => {
    const BlogsToSave = db.map(n => new Blog({ ...n, user: userForBlogs }))
    return Blog.bulkSave(BlogsToSave)
  },
  allBlogs: () => {
    return Blog.find({}).populate('user')
  },
  getBlog: (id) => {
    return Blog.findById(id).populate('user')
  },
  getInvalidId: async () => {
    const blogThatWillNotExist = new Blog({ title: 'won\t be here soon' })
    await blogThatWillNotExist.save()
    await blogThatWillNotExist.deleteOne()
    return blogThatWillNotExist._id.toString()
  },
  db,
  dbWithOneBlog
}
