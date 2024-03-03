import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(notes => setNotes(notes))
      .catch(err => showError(`Error occured while fetching notes: ${err.message}`))
  }, [])

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportant = (id, important) => {
    noteService.patch(id, { important: !important })
      .then(newNote => setNotes(notes.map(n => n.id === id ? newNote : n)))
      .catch(() => {
        showError('Error occured while updating note, removing from list')
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteToAdd = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(noteToAdd)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportant={() => toggleImportant(note.id, note.important)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          onChange={handleNoteChange}
          type="text"
          placeholder="enter note here"
          value={newNote}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
