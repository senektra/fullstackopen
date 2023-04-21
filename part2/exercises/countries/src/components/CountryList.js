const CountryList = ({ countries, onClick }) => {
  if (countries.length <= 1) {
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
          <li key={country.ccn3}>
            {country.name.common}
            <button 
              className="border rounded-md bg-gray-300 px-1 ml-1"
              onClick={() => onClick(country)}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList
