const PersonForm = ({onSubmit, onChangeName, onChangePhone}) => (
  <form onSubmit={onSubmit}>
    <h2>add new</h2>
    <div>
      <label>
        name: 
        <input 
          type="text" 
          name="name"
          onChange={onChangeName}
        />
      </label>
    </div>
    <div>
      <label>
        number: 
        <input 
          type="tel" 
          name="phone"
          onChange={onChangePhone}
        />
      </label>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm