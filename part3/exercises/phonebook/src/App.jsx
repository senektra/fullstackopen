import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

const notificationTypes = {
  info: 'info',
  error: 'err'
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notifMessage, setNotifMessage] = useState({ message: null, type: null})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(persons => { setPersons(persons) })
      .catch(err => { setNotifMessage({ 
          message: err.message,
          type: notificationTypes.error
        })
      })
  }, [])

  const personFind = () => persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase())

  const validForm = () => !(newName === '')

  const cleanForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const notify = (message, type=notificationTypes.info) => {
    setNotifMessage({
      message,
      type
    })
    setTimeout(() => {
      setNotifMessage({ 
        message: null, 
        type: null 
      })
    }, 5000)
  }

  const errorHandler = (err) => {
    const errMsg = err.response.data.message
    notify(errMsg, notificationTypes.error)
  }

  const handleFilter = (event) => setFilter(event.target.value.toLowerCase())
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = personFind()

    if (!validForm()) {
      notify(
        'Form is invalid',
        notificationTypes.error
      )
    }
    // Duplicate name entry
    else if (existingPerson) {
      const okToUpdate = window.confirm(
        `${newName} is already added to phonebook, update the number?`
      )

      if (okToUpdate) {
        personsService.put(existingPerson.id, {...existingPerson, number: newNumber})
          .then(putPerson => {
            setPersons(persons.map(p => p.id === putPerson.id ? putPerson : p))
            cleanForm()
            notify(`Updated number for ${putPerson.name}`)
          })
          .catch(errorHandler)
      }
    }
    // Commit person to database
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personsService.add(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          cleanForm()
          notify(`Added user ${addedPerson.name}`)
        })
        .catch(errorHandler)
    }
  }

  const deletePerson = (person) => {
    const ok = window.confirm(`Delete user ${person.name}?`)

    if (ok) {
      personsService.del(person.id)
        .then(() => { 
          setPersons(persons.filter(p => p.id !== person.id))
          notify(`${person.name} was removed`)
        })
        .catch(errorHandler)
    }
  }

  const toShow = filter === '' 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notif={notifMessage} />
      <Filter 
        onChange={handleFilter} 
        value={filter}
      />
      <h1>Add New</h1>
      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleName}
        name={newName}
        onNumberChange={handleNumber}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={toShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
