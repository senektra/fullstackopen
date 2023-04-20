import { useState, useEffect } from 'react'

import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'

import countriesService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    countriesService
      .getCountriesAll()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
      })
  }, [])

  const countriesToShow = countryFilter
    ? countries.filter(c => 
      c.name.common.toLowerCase().startsWith(countryFilter.toLowerCase())
    )
    : []

  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div className="flex-col w-full max-w-2xl bg-gray-100 mx-auto p-6">
      <CountryFilter onChange={handleCountryFilter}/>
      <CountryList countries={countriesToShow}/>
    </div>
  )
}

export default App
