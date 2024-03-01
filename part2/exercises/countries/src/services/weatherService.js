import axios from 'axios'

const getUrlFromLatLon = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

const getWeatherIcon = (icon, size) =>
  size ? 
    `https://openweathermap.org/img/wn/${icon}@${size}x.png`
  : `https://openweathermap.org/img/wn/${icon}.png`

const getWeather = async(lat, lon) => {
  const res = await axios.get(getUrlFromLatLon(lat, lon))
  return res.data
}

export default { getWeather, getWeatherIcon }