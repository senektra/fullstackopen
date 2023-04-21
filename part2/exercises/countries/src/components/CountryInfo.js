const CountryInfo = ({ selectedCountry }) => {
  if (!selectedCountry) return
  return (
    <div className="text-center">
      <h2 className="text-5xl mb-5">{selectedCountry.name.common}</h2>
      <div className="mx-auto mb-5">
        <img className="mx-auto object-cover h-14" src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`}/>
      </div>
      <p>Capital <strong>{selectedCountry.capital[0]}</strong> | Area <strong>{selectedCountry.area}</strong></p>
      <h3 className="my-3 text-2xl">Languages</h3>
      <ul>
        {Object.values(selectedCountry.languages).map(l => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

export default CountryInfo
