const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sgarcia:${password}@cluster0.nnt1k.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => {
    console.log('database connected')
  }).catch(error => {
    console.log(error)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true
})

note.save()
  .then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  }).catch(error => {
    console.log(error)
  })
