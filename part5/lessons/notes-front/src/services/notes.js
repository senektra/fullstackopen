import axios from 'axios'

const baseUrl = `${__API_URL__}/api/notes`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = newResource => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.post(baseUrl, newResource, config).then(res => res.data)
}

const put = (id, newResource) => {
  return axios.put(`${baseUrl}/${id}`, newResource).then(res => res.data)
}

const patch = (id, patches) => {
  return axios.patch(`${baseUrl}/${id}`, patches).then(res => res.data)
}

export default { getAll, create, put, patch, setToken }
