import axios from 'axios'

const baseUrl = 'https://fso-notes-backend.up.railway.app/api/notes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = newResource => {
  return axios.post(baseUrl, newResource).then(res => res.data)
}

const update = (id, newResource) => {
  return axios.put(`${baseUrl}/${id}`, newResource).then(res => res.data)
}

const patch = (id, patches) => {
  return axios.patch(`${baseUrl}/${id}`, patches).then(res => res.data)
}

export default { getAll, create, update, patch }
