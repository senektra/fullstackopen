const Note = require('../models/note')

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethisson' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  nonExistingId,
  notesInDb
}
