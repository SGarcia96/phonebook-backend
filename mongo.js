require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/Person')

const url = process.env.MONGO_DB_URI
const nameInput = process.argv[2]
const numberInput = process.argv[3]

mongoose.connect(url)
  .then(() => {
    console.log('database connected')
  }).catch(error => {
    console.log(error)
  })

const listPersons = () => {
  Person.find({}).then((persons) => {
    persons.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}

const newPerson = new Person({
  name: nameInput,
  number: numberInput
})

if (nameInput !== undefined && numberInput !== undefined) {
  newPerson.save()
    .then(result => {
      console.log(`added ${nameInput} number ${numberInput} to phonebook`)
      mongoose.connection.close()
    }).catch(error => {
      console.log(error)
    })
} else {
  listPersons()
}
