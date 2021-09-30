require('dotenv').config()
require('./mongo')

const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use(express.static('build'))

let persons = []

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (request, response) => {
  response.send(generateInfo())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  } else if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

  response.status(201).json(person)
})

const generateInfo = () => {
  return `Phonebook has info for ${persons.length} people
          <br><br>
          ${new Date()}`
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
