import axios from 'axios'

const weatherUrl = 'https://api.openweathermap.org/data/2.5'
const weatherIconBaseUrl = 'https://openweathermap.org/img'

const getWeatherIconUrl = (icon) => {
  return `${weatherIconBaseUrl}/wn/${icon}@2x.png`
}

const getApiCallUrl = (lat, lon) => {
    return `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_API_KEY}`
}

const getCurrentWeather = (lat, lon) => {
  const req = axios.get(getApiCallUrl(lat, lon))
  return req.then(res => res.data)
}

const weatherService = {
  getCurrentWeather,
  getWeatherIconUrl
}

export default weatherService
