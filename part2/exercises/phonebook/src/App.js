import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    const matchingPerson = persons.find(person => (
      person.name.toLowerCase() === newName.toLowerCase()
    ))

    if (matchingPerson) {
      // Trying to add matching person with same phone number.
      if (matchingPerson.number === newPhone) {
        alert('Person already added to phonebook')
        return
      }

      const confirm = window.confirm(
        `${matchingPerson.name} is already added to the phonebook, replace old number with new one?`
      )

      // Update matching person's phone with new phone specified.
      if (confirm) {
        phonebookService
          .putPerson(matchingPerson.id, {...matchingPerson, number: newPhone})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === matchingPerson.id ? updatedPerson : p))
            setNewName('')
            setNewPhone('')
          })
      }
    }
    // No matching person found with specified name or number, add to db.
    else {
      const newPerson = {
        name: newName,
        number: newPhone
      }

      phonebookService
        .addPerson(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const handleDelPerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .delPerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter label={"filter shown with: "} onChange={handleFilterChange} />
      <PersonForm 
        onSubmit={handlePersonAdd}
        name={newName}
        onChangeName={handleNameChange}
        phone={newPhone}
        onChangePhone={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelPerson={handleDelPerson}/>
    </div>
  )
}

export default App
