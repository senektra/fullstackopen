import { useState, useEffect } from 'react'

import weatherService from "../services/weather"

const kelvinToCelsius = (k) => {
  return k - 273.15
}

const CountryWeather = ({ selectedCountry }) => {
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    if (!selectedCountry) {
      setCurrentWeather(null)
      return
    }

    weatherService
      .getCurrentWeather(...selectedCountry.latlng)
      .then(weatherData => {
        setCurrentWeather(weatherData)
      })
  }, [selectedCountry])

  if (!currentWeather) return

  return (
    <div className="text-center">
      <h2 className="text-4xl my-3">Weather</h2>
      <div className="flex justify-center">
        <div className="px-4">
          <img
            className="h-15"
            src={weatherService.getWeatherIconUrl(currentWeather.weather[0].icon)}
            alt="current weather status"
          />
        </div>
        <div className="text-left p-5">
          <p>Temperature {kelvinToCelsius(currentWeather.main.temp).toFixed(1)} Celsius</p>
          <p>Wind {currentWeather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default CountryWeather
