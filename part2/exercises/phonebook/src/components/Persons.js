const Persons = ({persons, handleDelPerson}) => (
  <>
    {persons.map(person => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelPerson(person.id, person.name)}>delete</button>
      </div>
    ))}
  </>
)

export default Persons