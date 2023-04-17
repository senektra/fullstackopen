const Filter = ({label, onChange}) => (
  <div>
    <label>
      {label}
      <input
        type="text"
        name="filter"
        onChange={onChange}
      />
    </label>
  </div>
)

export default Filter