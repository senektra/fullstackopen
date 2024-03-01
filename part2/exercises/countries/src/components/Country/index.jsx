import { useEffect, useState } from 'react'

import weatherService from '../../services/weatherService'

import styles from './index.module.css'

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService.getWeather(...country.latlng)
      .then(weather => {
        console.log(weather)
        setWeatherData(weather)
      })
      .catch(err => {
        console.log('Error occured fetching weather data', err)
      })
  }, [country.latlng])

  const kelvinToCelsius = (kelvins) => (kelvins - 273.15).toFixed(2)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul className={styles['language-list']}>
        {Object.keys(country.languages).map(k =>
          <li key={k}>{country.languages[k]}</li>
        )}
      </ul>
      <img src={country.flags.png}/>
      <h2>Current Weather</h2>
      {weatherData ? (
        <>
          <img src={weatherService.getWeatherIcon(weatherData.weather[0].icon, 2)} />
          <div>Temperature: {kelvinToCelsius(weatherData.main.temp)} Celsius</div>
          <div>Wind {weatherData.wind.speed} m/s</div>
        </>
      ) : null}
    </div>
  )
}

export default Country