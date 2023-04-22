import express, { json } from 'express'
import morgan from 'morgan'

const app = express()

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? tokens.body(req, res) : ''
  ].join(' ')
}))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => Math.round(Math.random() * 1000000000 + 1)

/* General routes */

app.get('/info', (req, res) => {
  const numOfPersons = persons.length
  res.send(
    `Phonebook has info for ${numOfPersons} ${numOfPersons === 1 ? 'person' : 'people'}`
  )
})

/* API routes */

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  if (!person.name) {
    return res.status(418).json({
      error: "Name cannot be empty."
    })
  }

  if (!person.number) {
    return res.status(400).json({
      error: "Number cannot be empty."
    })
  }

  if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
    return res.status(400).json({
      error: "Duplicate name found, person not added."
    })
  }

  person.id = generateId()
  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const port = 3001

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
