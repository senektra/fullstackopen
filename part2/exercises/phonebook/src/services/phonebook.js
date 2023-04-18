import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const addPerson = (person) => {
  const req = axios.post(baseUrl, person)
  return req.then(res => res.data)
}

const putPerson = (id, newPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, newPerson)
  return req.then(res => res.data)
}

const delPerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const phonebookService = {
  getPersons,
  addPerson,
  putPerson,
  delPerson
}

export default phonebookService