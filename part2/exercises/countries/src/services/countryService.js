import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  return (await axios.get(`${baseUrl}/all`)).data
}

export default { getAll }