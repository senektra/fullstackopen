import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const handlePersonAdd = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newPhone}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter label={"filter shown with: "} onChange={handleFilterChange} />
      <PersonForm 
        onSubmit={handlePersonAdd}
        onChangeName={handleNameChange}
        onChangePhone={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
