import axios from 'axios'
const baseUrl = `${__API_URL__}/api/blogs`

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createBlog = async (blog) => {
  if (__DISABLE_AXIOS__) return
  const options = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, blog, options)
  return res.data
}

const updateBlog = async (blog) => {
  if (__DISABLE_AXIOS__) return
  const options = {
    headers: { Authorization: token }
  }

  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, options)
  return res.data
}

const deleteBlog = async (blog) => {
  const options = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${blog.id}`, options)
  return res.data
}

export default { setToken, getAll, createBlog, updateBlog, deleteBlog }
