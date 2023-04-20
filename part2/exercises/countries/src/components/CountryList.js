const CountryList = ({ countries }) => {
  if (countries.length >= 1) {
    return
  }

  if (countries.length > 10) {
    return (
      <div className="text-center">
        <p>Too many countries to list!</p>
      </div>
    )
  }

  return (
    <div>
      <ul className="text-center appearance-none">
        {countries.map(country => (
          <li key={country.ccn3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList
