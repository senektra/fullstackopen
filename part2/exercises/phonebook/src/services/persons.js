import axios from 'axios'

const baseUrl = 'http://localhost:3000/persons'

const getAll = async () => (await axios.get(baseUrl)).data
const add = async (person) => (await axios.post(baseUrl, person)).data
const del = async (id) => (await axios.delete(`${baseUrl}/${id}`)).data
const put = async (id, payload) => (await axios.put(`${baseUrl}/${id}`, payload)).data

export default { getAll, add, del, put }