const PersonForm = ({ onSubmit, onNameChange, onNumberChange, name, number }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} value={name}/><br/>
        number: <input onChange={onNumberChange} value={number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm