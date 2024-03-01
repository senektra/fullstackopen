import Country from '../Country'

import styles from './index.module.css'

const CountryList = ({ countries, setSearch }) => {
  // No country data
  if (!countries) {
    return null
  }
  // Too many countries to show
  else if (countries.length > 10) {
    return <div>Too many countries match...</div>
  }
  // Show country list
  else if (countries.length !== 1) {
    return (
      <ul className={styles['country-list']}>
        {countries.map(country =>
          <div key={country.ccn3} className={styles['country-listing']}>
            {country.name.common}
            <button 
              onClick={() => setSearch(country.name.common)}
              className={styles['country-button']}
            >
              Show
            </button>
          </div>
        )}
      </ul>
    )
  }
  // Show country data when countries array has only one country
  else {
    return <Country country={countries[0]} />
  }
}

export default CountryList