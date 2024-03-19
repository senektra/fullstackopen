import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(notes => setNotes(notes))
      .catch(err => showError(`Error occured while fetching notes: ${err.message}`))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      showError('Wrong credentials')
    }
  }

  const toggleImportant = (note) => {
    noteService.put(note.id, {...note, important: !note.important})
      .then(newNote => setNotes(notes.map(n => n.id === note.id ? newNote : n)))
      .catch(() => {
        showError('Error occured while updating note, removing from list')
        setNotes(notes.filter(n => n.id !== note.id))
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? 
        loginForm() 
      : 
        <div>
          <p>{user.name} is logged in</p>
          {noteForm()}
        </div>
      }

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
            toggleImportant={() => toggleImportant(note)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
