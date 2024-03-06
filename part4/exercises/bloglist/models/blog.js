import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

export default model('Blog', blogSchema)
