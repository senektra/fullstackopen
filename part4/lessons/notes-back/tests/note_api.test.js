const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const mongoHelper = require('../scripts/mongo')
const testHelper = require('./test_helper')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 4 notes', async () => {
  const res = await api.get('/api/notes')
  assert.strictEqual(res.body.length, 4)
})

test('the first note is about HTTP methods', async () => {
  const res = await api.get('/api/notes')
  assert(res.body[0].content.includes('HTML is easy'))
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await testHelper.notesInDb()
  assert.strictEqual(notesAtEnd.length, mongoHelper.db.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await testHelper.notesInDb()
  assert.strictEqual(notesAtEnd.length, mongoHelper.db.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await testHelper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await testHelper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await testHelper.notesInDb()

  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, mongoHelper.db.length - 1)
})

beforeEach(async () => {
  await mongoHelper.deleteNotes()
  await mongoHelper.saveNotes()
})

after(async () => {
  await mongoose.connection.close()
})
