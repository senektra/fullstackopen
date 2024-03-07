const fs = require('node:fs')
const Note = require('../models/note.js')
require('dotenv').config()

let db = JSON.parse(fs.readFileSync('./db.json'))

module.exports = {
  deleteNotes: () => {
    return Note.deleteMany({})
  },
  saveNotes: () => {
    const notesToSave = db.map(n => new Note({ ...n }))
    return Note.bulkSave(notesToSave)
  },
  db
}
