const CountryFilter = ({ onChange }) => {
  return (
    <div className="flex justify-center my-5">
      <label className="mr-5">Find Countries </label>
      <input 
        className="border px-2"
        onChange={onChange}
        type="text"
        name="country-filter"
      ></input>
    </div>
  )
}

export default CountryFilter
