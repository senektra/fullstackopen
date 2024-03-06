const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (_req, res, next) => {
  Note.find({})
    .then(notes => {res.json(notes)})
    .catch(next)
})

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.post('/', (req, res, next) => {
  const { body } = req

  if (!body.content) {
    return res.status(404).json({
      error: 'Content missing',
    })
  }

  const noteToAdd = new Note({
    content: body.content,
    important: body.important || false,
  })

  noteToAdd.save()
    .then(savedNote => {res.json(savedNote)})
    .catch(next)
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then(updatedNote => res.json(updatedNote))
    .catch(next)
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = notesRouter
