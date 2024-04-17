import axios from 'axios'
const baseUrl = `${__API_URL__}/api/users/login`

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default {
  login
}
