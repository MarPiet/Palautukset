const mongoose = require('mongoose')
const db = "phonebook"

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-aoqfj.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if(process.argv.length === 3){
    Person.find({}).then(persons =>{
      console.log(`${db}:`)
      persons.forEach(person =>{
        console.log(`${person.name} ${person.number}`)
      })
    mongoose.connection.close()
    })
}

else{
  person.save().then(response => {
  console.log(`added ${person.name} number ${person.number} to ${db}`)
  mongoose.connection.close()
})}