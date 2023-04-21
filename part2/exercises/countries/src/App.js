import { useState, useEffect } from 'react'

import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo.js'

import countriesService from "./services/countries"
import CountryWeather from './components/CountryWeather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getCountriesAll()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry({...countriesToShow[0]})
    } else {
      setSelectedCountry(null)
    }
  }, [countriesToShow])

  const handleCountryFilter = (event) => {
    const newFilter = event.target.value
    setCountryFilter(newFilter)
    setCountriesToShow(newFilter !== ''
      ? countries.filter(c => 
        c.name.common.toLowerCase().startsWith(newFilter.toLowerCase())
      )
      : [])
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
    setCountryFilter(country.name.common)
    setCountriesToShow([country])
  }

  return (
    <div className="flex-col w-full max-w-2xl bg-[#EB8755] mx-auto p-6">
      <CountryFilter onChange={handleCountryFilter} value={countryFilter}/>
      <CountryList countries={countriesToShow} onClick={handleSelectCountry}/>
      <CountryInfo selectedCountry={selectedCountry} />
      <CountryWeather selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
