const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
morgan.token('type', function(req, res){return JSON.stringify(req.body)})
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json()) 
app.use(express.static('build'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === Number(req.params.id))
  if(person)
    res.json(person)
  else
    res.status(404).end()
})

app.get('/api/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br/><br/> ${new Date()}`)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))
  res.status(204).end()
})
app.post('/api/persons', (req, res) =>{
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }
  if (persons.filter(person => person.name === body.name).length > 0) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const id = Math.floor(Math.random() * 10000)
  const person = {
    name: body.name,
    number: body.number,
    id: id
  }
  persons = persons.concat(person)
  res.json(person)

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})