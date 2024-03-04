const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const Note = require('./models/note')

// Express app
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

  return maxId + 1
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(err)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(404).json({
      error: 'Content missing'
    })
  }

  const noteToAdd = new Note({
    content: body.content,
    important: body.important || false,
  })

  noteToAdd.save()
    .then(savedNote => {
      res.json(savedNote)
    })
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  const newNote = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(req.params.id, newNote, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(next)
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => { res.status(204).end() })
    .catch(next)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
