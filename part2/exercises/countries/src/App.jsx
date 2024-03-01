import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'

import countryService from './services/countryService'

import './App.css'

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    countryService.getAll()
      .then(countries => {
        setCountries(countries)
        setLoading(false)
      })
      .catch(() => {
        alert('Error occured while fetching countries')
        setLoading(false)
      })
  }, [])

  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  const handleSetSearch = (countryQuery) => {
    setCountryFilter(countryQuery)
  }

  const countriesToShow = countryFilter ? 
    countries.filter(c => 
      c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    : null

  return (
    <>
      <CountryFilter onChange={handleCountryFilter} value={countryFilter} />
      {loading ? (
        <>
          <FontAwesomeIcon icon={faSpinner} spinPulse/>
          <div>Initializing countries</div>
        </>
      ) : (
        <CountryList 
          countries={countriesToShow}
          setSearch={handleSetSearch}
        />
      )}
    </>
  )
}

export default App
