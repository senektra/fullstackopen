import axios from 'axios'

const restCountriesUrl = 'https://restcountries.com/v3.1'

const getCountriesAll = () => {
  const req = axios.get(`${restCountriesUrl}/all`)
  return req.then(res => res.data)
}

const countriesService = {
  getCountriesAll
}

export default countriesService
